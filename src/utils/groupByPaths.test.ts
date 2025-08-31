import { describe, expect, test, vi } from 'vitest';
import {
  groupByPaths,
  traverseGroups,
  type GroupByPath,
} from './groupByPaths.ts';

type TestFile = { filename: string; originalPath: string };

const makeTestFile = (filepath: string): TestFile => {
  const filepathSplit = filepath.split('/');

  return {
    filename: filepathSplit[filepathSplit.length - 1]!,
    originalPath: filepath,
  };
};

describe('flat folder structure', () => {
  const R0003189JPG = makeTestFile('/ricoh/DCIM/R0003189.JPG');
  const R0003189DNG = makeTestFile('/ricoh/DCIM/R0003189.DNG');
  const R0003190JPG = makeTestFile('/ricoh/DCIM/R0003190.JPG');
  const testFiles = [R0003189JPG, R0003189DNG, R0003190JPG];

  test(groupByPaths, () => {
    const DCIM: GroupByPath<TestFile> = new Map(
      Object.entries({
        [R0003189JPG.filename]: R0003189JPG,
        [R0003189DNG.filename]: R0003189DNG,
        [R0003190JPG.filename]: R0003190JPG,
      }),
    );
    const ricoh: GroupByPath<TestFile> = new Map(Object.entries({ DCIM }));
    const root: GroupByPath<TestFile> = new Map(Object.entries({ ricoh }));

    expect(groupByPaths(testFiles)).toStrictEqual(root);
  });

  test(traverseGroups, () => {
    const f = vi.fn();

    debugger;

    traverseGroups(f, groupByPaths(testFiles));

    expect(f).toHaveBeenCalledTimes(1);
    expect(f).toHaveBeenNthCalledWith(1, [
      R0003189JPG,
      R0003189DNG,
      R0003190JPG,
    ]);
  });
});

describe('nested folder structure', () => {
  const rootFile = makeTestFile('/foo.txt');
  const nestedFileA = makeTestFile('/nested/deep/a.jpg');
  const nestedFileB = makeTestFile('/nested/deep/b.jpg');
  const otherFileC = makeTestFile('/other_folder/c.jpg');
  const testFiles = [rootFile, nestedFileA, nestedFileB, otherFileC];

  test(groupByPaths, () => {
    const deep: GroupByPath<TestFile> = new Map(
      Object.entries({
        [nestedFileA.filename]: nestedFileA,
        [nestedFileB.filename]: nestedFileB,
      }),
    );
    const nested: GroupByPath<TestFile> = new Map(Object.entries({ deep }));
    const other_folder: GroupByPath<TestFile> = new Map(
      Object.entries({
        [otherFileC.filename]: otherFileC,
      }),
    );
    const root: GroupByPath<TestFile> = new Map(
      Object.entries({
        [rootFile.filename]: rootFile,
        nested,
        other_folder,
      }),
    );

    expect(groupByPaths(testFiles)).toStrictEqual(root);
  });

  test(traverseGroups, () => {
    const f = vi.fn();

    traverseGroups(f, groupByPaths(testFiles));

    expect(f).toHaveBeenCalledTimes(3);
    expect(f).toHaveBeenNthCalledWith(1, [rootFile]);
    expect(f).toHaveBeenNthCalledWith(2, [nestedFileA, nestedFileB]);
    expect(f).toHaveBeenNthCalledWith(3, [otherFileC]);
  });
});
