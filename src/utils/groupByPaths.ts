export type GroupByPath<T extends { originalPath: string }> = Map<
  string,
  GroupByPath<T> | T
>;

/** Converts assets in a tree-like structure, grouping assets together by folder boundaries. */
export function groupByPaths<T extends { originalPath: string }>(
  assets: T[],
): GroupByPath<T> {
  const result = new Map();
  debugger;

  for (const asset of assets) {
    const splitPath = asset.originalPath.split('/');

    // drop first element, it is empty usually
    if (splitPath[0] === '') {
      splitPath.shift();
    }

    let currentFolder = result;
    // last element of the split path is the file, everything before are nested folders
    while (splitPath.length > 1) {
      let newFolder: GroupByPath<T>;
      if (currentFolder.has(splitPath[0])) {
        newFolder = currentFolder.get(splitPath[0]);
      } else {
        newFolder = new Map();
        currentFolder.set(splitPath[0], newFolder);
      }
      currentFolder = newFolder;
      splitPath.shift();
    }
    // set file
    currentFolder.set(splitPath[0], asset);
  }

  return result;
}

function isNotFolder<T extends { originalPath: string }>(
  x: T | GroupByPath<T>,
): x is T {
  return !(x instanceof Map);
}

/** Traverses files by folders from {@link groupByPaths} with a function. */
export function traverseGroups<T extends { originalPath: string }>(
  f: (assets: T[]) => void,
  input: GroupByPath<T>,
): void {
  const listItems: T[] = [];
  const listRecursiveCalls: GroupByPath<T>[] = [];

  for (const [_, item] of input) {
    if (isNotFolder(item)) {
      listItems.push(item);
    } else {
      listRecursiveCalls.push(item);
    }
  }

  if (listItems.length > 0) {
    f(listItems);
  }

  for (const group of listRecursiveCalls) {
    traverseGroups(f, group);
  }
}
