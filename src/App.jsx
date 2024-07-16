import React, { useEffect, useState } from 'react';



const App = () => {


  const [randomArray, setrandomArray] = useState([]);

  const handleclick = () => {
    const newarr = [];
    for (let i = 0; i < 50; i++) {
      const rd = Math.floor(Math.random() * 100);
      newarr.push(rd);
    }
    setrandomArray(newarr);
  };

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const bubblesort = async () => {
    const newArr = [...randomArray];
    const bars = document.getElementsByClassName('BARS');
    for (let i = 0; i < 49; i++) {
      bars[i].className = `w-[2%] bg-red-600 BARS`;
      for (let j = i + 1; j < 50; j++) {
        bars[j].className = `w-[2%] bg-yellow-600 BARS`;
        if (newArr[i] > newArr[j]) {
          const temp = newArr[i];
          newArr[i] = newArr[j];
          newArr[j] = temp;
          await sleep(50);
          setrandomArray([...newArr]);
          await sleep(50);
        }
        await sleep(20);
        bars[j].className = `w-[2%] bg-slate-600 BARS`;
      }
      bars[i].className = `w-[2%] bg-slate-600 BARS`;
    }
  };

  async function partition(newArr, low, high) {
    const bars = document.getElementsByClassName('BARS');
    let i = low + 1;
    let j = high;
    let pivot = low;
    bars[pivot].className = `w-[2%] bg-red-600 BARS`;
    await sleep(500);
    while (i <= j) {
      while (i <= high && newArr[i] <= newArr[pivot]) {
        i++;
        bars[i].className = `w-[2%] bg-green-600 BARS`;
        await sleep(100);
        bars[i].className = `w-[2%] bg-slate-600 BARS`;
      }
      while (j >= low && newArr[j] > newArr[pivot]) {
        bars[j].className = `w-[2%] bg-green-600 BARS`;
        j--;
        bars[j].className = `w-[2%] bg-blue-600 BARS`;
        await sleep(100);
        bars[j].className = `w-[2%] bg-slate-600 BARS`;
      }
      if (i < j) {
        let temp = newArr[i];
        newArr[i] = newArr[j];
        newArr[j] = temp;
        setrandomArray([...newArr]);
      }
    }
    bars[pivot].className = `w-[2%] bg-slate-600 BARS`;
    let temp1 = newArr[low];
    newArr[low] = newArr[j];
    newArr[j] = temp1;
    setrandomArray([...newArr]);
    await sleep(50);
    return j;
  }

  async function quicksort(newArr, low, high) {
    if (low < high) {
      let pIndex = await partition(newArr, low, high);
      await quicksort(newArr, low, pIndex - 1);
      await quicksort(newArr, pIndex + 1, high);
    }
  }

  const qs = async () => {
    let newArr = [...randomArray];
    await quicksort(newArr, 0, newArr.length - 1);
  };

  async function merge(newArr, low, mid, high) {
    const bars = document.getElementsByClassName('BARS');
    let i = low;
    let j = mid + 1;
    let ans = [];
    await sleep(500);
    while (i <= mid && j <= high) {
      bars[i].className = `w-[2%] bg-green-600 BARS`;
      bars[j].className = `w-[2%] bg-blue-600 BARS`;
      if (newArr[i] <= newArr[j]) {
        ans.push(newArr[i]);
        await sleep(50);
        bars[i].className = `w-[2%] bg-slate-600 BARS`;
        i++;
      } else {
        ans.push(newArr[j]);
        await sleep(50);
        bars[j].className = `w-[2%] bg-slate-600 BARS`;
        j++;
      }
    }
    while (j <= high) {
      bars[j].className = `w-[2%] bg-blue-600 BARS`;
      await sleep(50);
      ans.push(newArr[j]);
      bars[j].className = `w-[2%] bg-slate-600 BARS`;
      j++;
    }
    while (i <= mid) {
      bars[i].className = `w-[2%] bg-green-600 BARS`;
      await sleep(50);
      ans.push(newArr[i]);
      bars[i].className = `w-[2%] bg-slate-600 BARS`;
      i++;
    }
    for (let k = 0; k < ans.length; k++) {
      newArr[low + k] = ans[k];
    }
    setrandomArray([...newArr]);
  }

  async function mergesort(newArr, low, high) {
    if (low < high) {
      let mid = Math.floor((low + high) / 2);
      await mergesort(newArr, low, mid);
      await sleep(50);
      await mergesort(newArr, mid + 1, high);
      await sleep(50);
      await merge(newArr, low, mid, high);
    }
  }

  const ms = () => {
    let newArr = [...randomArray];
    mergesort(newArr, 0, newArr.length - 1);
  };

  const Ss = async () => {
    const bars = document.getElementsByClassName('BARS');
    let newArr = [...randomArray];
    let i = 0;
    while (i < newArr.length) {
      let min = i;
      bars[i].className = `w-[2%] bg-teal-600 BARS`;
      for (let j = i + 1; j < newArr.length; j++) {
        bars[j].className = `w-[2%] bg-blue-600 BARS`;
        if (newArr[j] < newArr[min]) {
          min = j;
        }
        await sleep(50);
        bars[j].className = `w-[2%] bg-slate-600 BARS`;
      }
      bars[min].className = `w-[2%] bg-red-700 BARS`;
      await sleep(1000);
      bars[min].className = `w-[2%] bg-slate-600 BARS`;
      await sleep(50);
      bars[i].className = `w-[2%] bg-slate-600 BARS`;
      let temp = newArr[min];
      newArr[min] = newArr[i];
      newArr[i] = temp;
      setrandomArray([...newArr]);
      i++;
    }
    setrandomArray([...newArr]);
  };

  const Is = async () => {
    const bars = document.getElementsByClassName('BARS');
    let newArr = [...randomArray];
    let low = 0;
    let i = 0;
    while (i < newArr.length) {
      for (let l = 0; l < i; l++) {
        bars[l].className = `w-[2%] bg-red-600 BARS`;
      }
      await sleep(500);
      for (let k = low; k <= i; k++) {
        for (let j = k; j <= i; j++) {
          if (newArr[k] > newArr[j]) {
            let temp = newArr[k];
            newArr[k] = newArr[j];
            newArr[j] = temp;
            setrandomArray([...newArr]);
          }
        }
      }
      i++;
    }
    for (let l = 0; l < newArr.length; l++) {
      bars[l].className = `w-[2%] bg-slate-600 BARS`;
    }
  };

  async function heapify(newArr, N, i) {
    const bars = document.getElementsByClassName('BARS');
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < N) bars[l].className = `w-[2%] bg-green-600 BARS`;
    if (r < N) bars[r].className = `w-[2%] bg-yellow-600 BARS`;
    bars[largest].className = `w-[2%] bg-red-600 BARS`;

    await sleep(500);

    if (l < N && newArr[l] > newArr[largest]) {
      bars[largest].className = `w-[2%] bg-slate-600 BARS`;
      largest = l;
      bars[largest].className = `w-[2%] bg-red-600 BARS`;
    }

    if (r < N && newArr[r] > newArr[largest]) {
      bars[largest].className = `w-[2%] bg-slate-600 BARS`;
      largest = r;
      bars[largest].className = `w-[2%] bg-red-600 BARS`;
    }

    if (largest !== i) {
      let temp = newArr[i];
      newArr[i] = newArr[largest];
      newArr[largest] = temp;
      setrandomArray([...newArr]);

      bars[largest].className = `w-[2%] bg-slate-600 BARS`;
      bars[l].className = `w-[2%] bg-slate-600 BARS`;
      bars[r].className = `w-[2%] bg-slate-600 BARS`;

      await heapify(newArr, N, largest);
    } else {
      bars[largest].className = `w-[2%] bg-slate-600 BARS`;
      if (l < N) bars[l].className = `w-[2%] bg-slate-600 BARS`;
      if (r < N) bars[r].className = `w-[2%] bg-slate-600 BARS`;
    }
  }

  const heapsort = async (newArr, N) => {
    for (let i = Math.floor(N / 2) - 1; i >= 0; i--) {
      await heapify(newArr, N, i);
    }
    for (let i = N - 1; i > 0; i--) {
      let temp = newArr[0];
      newArr[0] = newArr[i];
      newArr[i] = temp;
      setrandomArray([...newArr]);
      await heapify(newArr, i, 0);
    }
  };

  const hs = async () => {
    let newArr = [...randomArray];
    await heapsort(newArr, newArr.length);
  };

  return (
    <div className='bg-blue-500 w-full h-[100vh] text-white'>
      <div className='w-full h-[70%] bg-red-900 flex justify-center items-center'>
        <div className='bg-black w-[60%] h-[60%] flex justify-evenly items-end'>
          {randomArray.map((item, index) => (
            <div className={`w-[2%] bg-slate-600 BARS`} key={index} style={{ height: `${item}%` }}></div>
          ))}
        </div>
      </div>
      <div className='w-full h-[30%] bg-slate-800'>
        <button onClick={handleclick} className='p-2 bg-red-500 m-3 rounded'>Reset</button>
        <button onClick={bubblesort} className='p-2 bg-green-500 m-2 SORT1'>Bubble Sort</button>
        <button onClick={qs} className='p-2 bg-green-500 m-2 SORT2'>Quick Sort</button>
        <button onClick={ms} className='p-2 bg-green-500 m-2 SORT2'>Merge Sort</button>
        <button onClick={Ss} className='p-2 bg-green-500 m-2 SORT2'>Selection Sort</button>
        <button onClick={Is} className='p-2 bg-green-500 m-2 SORT2'>Insertion Sort</button>
        <button onClick={hs} className='p-2 bg-green-500 m-2 SORT2'>Heap Sort</button>
      </div>
    </div>
  );
};

export default App;
