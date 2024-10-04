/**
 * 冒泡排序
 * @param arr - 需要排序的数组
 */
function bubbleSort(arr) {
  const LEN = arr.length;
  for (let i = 0; i < LEN; i++) {
    for (let j = 0; j < LEN - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}

/**
 * 快速排序
 * @param arr - 需要排序的数组
 */
function quickSort(arr) {
  const LEN = arr.length;

  const sort = (low, high) => {
    if (low >= high) {
      return;
    }

    const compareValue = arr[low];
    let left = low,
      right = high;

    while (left < right) {
      while (left < right && compareValue <= arr[right]) {
        right--;
      }
      if (left < right) {
        arr[left] = arr[right];
        left++;
      }
      while (left < right && compareValue >= arr[left]) {
        left++;
      }
      if (left < right) {
        arr[right] = arr[left];
        right--;
      }
    }

    arr[left] = compareValue;
    sort(low, left - 1);
    sort(left + 1, high);
  };

  sort(0, LEN - 1);
  return arr;
}

/**
 * 选择排序
 * @param arr - 需要排序的数组
 */
function selectionSort(arr) {
  const LEN = arr.length;
  for (let i = 0; i < LEN; i++) {
    let minIndex = i;
    for (let j = i + 1; j < LEN; j++) {
      minIndex = arr[minIndex] < arr[j] ? minIndex : j;
    }
    const temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }

  return arr;
}

/**
 * 堆排序
 * @param arr - 需要排序的数组
 */
function heapSort(arr) {
  const LEN = arr.length;
  const floor = Math.floor;

  const swap = (left, right) => {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
  };

  const buildHeap = (i, len) => {
    for (
      let maxIndex = 2 * i + 1;
      maxIndex < len;
      maxIndex = 2 * maxIndex + 1
    ) {
      if (maxIndex + 1 < len && arr[maxIndex] < arr[maxIndex + 1]) {
        maxIndex++;
      }
      if (arr[i] < arr[maxIndex]) {
        swap(i, maxIndex);
        i = maxIndex;
      }
    }
  };

  for (let i = floor(LEN / 2) - 1; i >= 0; i--) {
    buildHeap(i, LEN);
  }

  for (let i = LEN - 1; i > 0; i--) {
    swap(0, i);
    buildHeap(0, i);
  }

  return arr;
}

/**
 * 插入排序
 * @param arr - 需要排序的数组
 */
function insertionSort(arr) {
  const LEN = arr.length;

  for (let i = 1; i < LEN; i++) {
    const x = arr[i];
    let j = i;
    for (; j > 0 && x < arr[j - 1]; j--) {
      arr[j] = arr[j - 1];
    }
    arr[j] = x;
  }

  return arr;
}
