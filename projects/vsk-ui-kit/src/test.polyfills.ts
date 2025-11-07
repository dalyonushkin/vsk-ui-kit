if (!Array.prototype.at) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.at = function atPolyfill(index: number) {
    const length = this.length ?? 0;
    if (length === 0) {
      return undefined;
    }

    const relativeIndex = index ?? 0;
    const normalizedIndex = relativeIndex >= 0 ? relativeIndex : length + relativeIndex;

    if (normalizedIndex < 0 || normalizedIndex >= length) {
      return undefined;
    }

    return this[normalizedIndex];
  };
}

if (!String.prototype.at) {
  // eslint-disable-next-line no-extend-native
  String.prototype.at = function atPolyfill(index: number) {
    const length = this.length ?? 0;
    if (length === 0) {
      return undefined;
    }

    const relativeIndex = index ?? 0;
    const normalizedIndex = relativeIndex >= 0 ? relativeIndex : length + relativeIndex;

    if (normalizedIndex < 0 || normalizedIndex >= length) {
      return undefined;
    }

    return this.charAt(normalizedIndex);
  };
}
