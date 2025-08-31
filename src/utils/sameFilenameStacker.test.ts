import { describe, expect, test } from 'vitest';
import { getBasename, getNameExtension } from './sameFilenameStacker.ts';

describe(getBasename, () => {
  describe('should return the basename of the filename', () => {
    test('Ricoh GR IIIx', () => {
      expect(getBasename('R0003189.JPG')).toBe('R0003189');
      expect(getBasename('R0000972.DNG')).toBe('R0000972');
    });

    test('Panasonic Lumix GF-10', () => {
      expect(getBasename('P1030112.JPG')).toBe('P1030112');
      expect(getBasename('P1000083.RW2')).toBe('P1000083');
      expect(getBasename('P1030198.MP4')).toBe('P1030198');
    });

    test('Olympus OM-D E-M5 Mark II', () => {
      expect(getBasename('P8240881.JPG')).toBe('P8240881');
      expect(getBasename('P8240915.ORF')).toBe('P8240915');
    });
  });
});

describe(getNameExtension, () => {
  describe('should return the extension for a simple file', () => {
    test('Ricoh GR IIIx', () => {
      expect(getNameExtension('R0003189.JPG')).toBe('JPG');
      expect(getNameExtension('R0000972.DNG')).toBe('DNG');
    });

    test('Panasonic Lumix GF-10', () => {
      expect(getNameExtension('P1030112.JPG')).toBe('JPG');
      expect(getNameExtension('P1000083.RW2')).toBe('RW2');
      expect(getNameExtension('P1030198.MP4')).toBe('MP4');
    });

    test('Olympus OM-D E-M5 Mark II', () => {
      expect(getNameExtension('P8240881.JPG')).toBe('JPG');
      expect(getNameExtension('P8240915.ORF')).toBe('ORF');
    });
  });
});
