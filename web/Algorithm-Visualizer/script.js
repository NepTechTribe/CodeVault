class SortingVisualizer {
    constructor() {
        this.array = [];
        this.bars = [];
        this.isSorting = false;
        this.speed = 5;
        this.comparisons = 0;
        this.swaps = 0;
        this.startTime = 0;
        
        this.algorithmInfo = {
            bubble: {
                title: "Bubble Sort",
                description: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.",
                timeComplexity: "O(n²)",
                spaceComplexity: "O(1)"
            },
            selection: {
                title: "Selection Sort",
                description: "Selection Sort finds the minimum element in the unsorted portion of the array and swaps it with the first element of the unsorted portion. This process is repeated until the entire array is sorted.",
                timeComplexity: "O(n²)",
                spaceComplexity: "O(1)"
            },
            insertion: {
                title: "Insertion Sort",
                description: "Insertion Sort builds the final sorted array one element at a time. It takes elements from the unsorted portion and inserts them into their correct position in the sorted portion.",
                timeComplexity: "O(n²)",
                spaceComplexity: "O(1)"
            },
            quick: {
                title: "Quick Sort",
                description: "Quick Sort uses a divide-and-conquer approach. It picks a 'pivot' element and partitions the array around the pivot, then recursively sorts the sub-arrays.",
                timeComplexity: "O(n log n) average, O(n²) worst",
                spaceComplexity: "O(log n)"
            },
            merge: {
                title: "Merge Sort",
                description: "Merge Sort is a divide-and-conquer algorithm that divides the array into two halves, recursively sorts them, and then merges the sorted halves back together.",
                timeComplexity: "O(n log n)",
                spaceComplexity: "O(n)"
            }
        };
        
        this.initializeElements();
        this.setupEventListeners();
        this.generateArray();
        this.updateAlgorithmInfo();
    }
    
    initializeElements() {
        this.algorithmSelect = document.getElementById('algorithm-select');
        this.arraySizeSlider = document.getElementById('array-size');
        this.arraySizeValue = document.getElementById('array-size-value');
        this.speedSlider = document.getElementById('speed');
        this.speedValue = document.getElementById('speed-value');
        this.generateBtn = document.getElementById('generate-array');
        this.startBtn = document.getElementById('start-sort');
        this.stopBtn = document.getElementById('stop-sort');
        this.barsContainer = document.getElementById('bars-container');
        this.comparisonsSpan = document.getElementById('comparisons');
        this.swapsSpan = document.getElementById('swaps');
        this.timeSpan = document.getElementById('time');
        this.algorithmTitle = document.getElementById('algorithm-title');
        this.algorithmDescription = document.getElementById('algorithm-description');
        this.timeComplexity = document.getElementById('time-complexity');
        this.spaceComplexity = document.getElementById('space-complexity');
    }
    
    setupEventListeners() {
        this.arraySizeSlider.addEventListener('input', (e) => {
            this.arraySizeValue.textContent = e.target.value;
            if (!this.isSorting) {
                this.generateArray();
            }
        });
        
        this.speedSlider.addEventListener('input', (e) => {
            this.speedValue.textContent = e.target.value;
            this.speed = parseInt(e.target.value);
        });
        
        this.generateBtn.addEventListener('click', () => {
            if (!this.isSorting) {
                this.generateArray();
            }
        });
        
        this.startBtn.addEventListener('click', () => {
            this.startSorting();
        });
        
        this.stopBtn.addEventListener('click', () => {
            this.stopSorting();
        });
        
        this.algorithmSelect.addEventListener('change', () => {
            this.updateAlgorithmInfo();
        });
    }
    
    generateArray() {
        const size = parseInt(this.arraySizeSlider.value);
        this.array = Array.from({ length: size }, () => Math.floor(Math.random() * 300) + 10);
        this.renderBars();
        this.resetStats();
    }
    
    renderBars() {
        this.barsContainer.innerHTML = '';
        this.bars = [];
        
        const maxHeight = Math.max(...this.array);
        
        this.array.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${(value / maxHeight) * 100}%`;
            bar.style.width = `${100 / this.array.length}%`;
            bar.dataset.index = index;
            bar.dataset.value = value;
            this.barsContainer.appendChild(bar);
            this.bars.push(bar);
        });
    }
    
    resetStats() {
        this.comparisons = 0;
        this.swaps = 0;
        this.updateStats();
        this.clearBarStates();
    }
    
    updateStats() {
        this.comparisonsSpan.textContent = this.comparisons;
        this.swapsSpan.textContent = this.swaps;
        
        if (this.startTime) {
            const elapsed = Date.now() - this.startTime;
            this.timeSpan.textContent = `${elapsed}ms`;
        }
    }
    
    clearBarStates() {
        this.bars.forEach(bar => {
            bar.classList.remove('comparing', 'swapping', 'sorted');
        });
    }
    
    async highlightBars(indices, className = 'comparing') {
        indices.forEach(index => {
            if (this.bars[index]) {
                this.bars[index].classList.add(className);
            }
        });
        
        await this.delay();
        
        indices.forEach(index => {
            if (this.bars[index]) {
                this.bars[index].classList.remove(className);
            }
        });
    }
    
    async swapBars(i, j) {
        this.bars[i].classList.add('swapping');
        this.bars[j].classList.add('swapping');
        
        await this.delay();
        
        // Swap in array
        [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
        
        // Update bar heights
        const maxHeight = Math.max(...this.array);
        this.bars[i].style.height = `${(this.array[i] / maxHeight) * 100}%`;
        this.bars[j].style.height = `${(this.array[j] / maxHeight) * 100}%`;
        
        this.bars[i].classList.remove('swapping');
        this.bars[j].classList.remove('swapping');
        
        this.swaps++;
        this.updateStats();
    }
    
    async markSorted(index) {
        this.bars[index].classList.add('sorted');
    }
    
    delay() {
        return new Promise(resolve => {
            setTimeout(resolve, Math.max(50, 500 - (this.speed * 50)));
        });
    }
    
    updateAlgorithmInfo() {
        const selectedAlgorithm = this.algorithmSelect.value;
        const info = this.algorithmInfo[selectedAlgorithm];
        
        this.algorithmTitle.textContent = info.title;
        this.algorithmDescription.textContent = info.description;
        this.timeComplexity.textContent = info.timeComplexity;
        this.spaceComplexity.textContent = info.spaceComplexity;
    }
    
    async startSorting() {
        if (this.isSorting) return;
        
        this.isSorting = true;
        this.startTime = Date.now();
        this.startBtn.disabled = true;
        this.stopBtn.disabled = false;
        this.generateBtn.disabled = true;
        this.arraySizeSlider.disabled = true;
        this.algorithmSelect.disabled = true;
        
        this.resetStats();
        this.clearBarStates();
        
        const algorithm = this.algorithmSelect.value;
        
        try {
            switch (algorithm) {
                case 'bubble':
                    await this.bubbleSort();
                    break;
                case 'selection':
                    await this.selectionSort();
                    break;
                case 'insertion':
                    await this.insertionSort();
                    break;
                case 'quick':
                    await this.quickSort(0, this.array.length - 1);
                    break;
                case 'merge':
                    await this.mergeSort(0, this.array.length - 1);
                    break;
            }
            
            // Mark all bars as sorted
            for (let i = 0; i < this.array.length; i++) {
                await this.markSorted(i);
                await this.delay();
            }
            
        } catch (error) {
            console.log('Sorting stopped');
        }
        
        this.finishSorting();
    }
    
    stopSorting() {
        this.isSorting = false;
        this.finishSorting();
    }
    
    finishSorting() {
        this.isSorting = false;
        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        this.generateBtn.disabled = false;
        this.arraySizeSlider.disabled = false;
        this.algorithmSelect.disabled = false;
        
        const elapsed = Date.now() - this.startTime;
        this.timeSpan.textContent = `${elapsed}ms`;
    }
    
    // Sorting Algorithms
    
    async bubbleSort() {
        const n = this.array.length;
        
        for (let i = 0; i < n - 1; i++) {
            if (!this.isSorting) throw new Error('Stopped');
            
            for (let j = 0; j < n - i - 1; j++) {
                if (!this.isSorting) throw new Error('Stopped');
                
                this.comparisons++;
                this.updateStats();
                
                await this.highlightBars([j, j + 1]);
                
                if (this.array[j] > this.array[j + 1]) {
                    await this.swapBars(j, j + 1);
                }
            }
            
            await this.markSorted(n - 1 - i);
        }
    }
    
    async selectionSort() {
        const n = this.array.length;
        
        for (let i = 0; i < n - 1; i++) {
            if (!this.isSorting) throw new Error('Stopped');
            
            let minIndex = i;
            
            for (let j = i + 1; j < n; j++) {
                if (!this.isSorting) throw new Error('Stopped');
                
                this.comparisons++;
                this.updateStats();
                
                await this.highlightBars([minIndex, j]);
                
                if (this.array[j] < this.array[minIndex]) {
                    minIndex = j;
                }
            }
            
            if (minIndex !== i) {
                await this.swapBars(i, minIndex);
            }
            
            await this.markSorted(i);
        }
        
        await this.markSorted(n - 1);
    }
    
    async insertionSort() {
        const n = this.array.length;
        
        for (let i = 1; i < n; i++) {
            if (!this.isSorting) throw new Error('Stopped');
            
            let key = this.array[i];
            let j = i - 1;
            
            await this.highlightBars([i]);
            
            while (j >= 0) {
                if (!this.isSorting) throw new Error('Stopped');
                
                this.comparisons++;
                this.updateStats();
                
                await this.highlightBars([j, i]);
                
                if (this.array[j] > key) {
                    await this.swapBars(j, j + 1);
                    j--;
                } else {
                    break;
                }
            }
            
            await this.markSorted(i);
        }
    }
    
    async quickSort(low, high) {
        if (low < high) {
            if (!this.isSorting) throw new Error('Stopped');
            
            const pivotIndex = await this.partition(low, high);
            
            await this.quickSort(low, pivotIndex - 1);
            await this.quickSort(pivotIndex + 1, high);
        }
    }
    
    async partition(low, high) {
        const pivot = this.array[high];
        let i = low - 1;
        
        for (let j = low; j < high; j++) {
            if (!this.isSorting) throw new Error('Stopped');
            
            this.comparisons++;
            this.updateStats();
            
            await this.highlightBars([j, high]);
            
            if (this.array[j] < pivot) {
                i++;
                if (i !== j) {
                    await this.swapBars(i, j);
                }
            }
        }
        
        await this.swapBars(i + 1, high);
        return i + 1;
    }
    
    async mergeSort(left, right) {
        if (left < right) {
            if (!this.isSorting) throw new Error('Stopped');
            
            const mid = Math.floor((left + right) / 2);
            
            await this.mergeSort(left, mid);
            await this.mergeSort(mid + 1, right);
            await this.merge(left, mid, right);
        }
    }
    
    async merge(left, mid, right) {
        const leftArray = this.array.slice(left, mid + 1);
        const rightArray = this.array.slice(mid + 1, right + 1);
        
        let i = 0, j = 0, k = left;
        
        while (i < leftArray.length && j < rightArray.length) {
            if (!this.isSorting) throw new Error('Stopped');
            
            this.comparisons++;
            this.updateStats();
            
            await this.highlightBars([left + i, mid + 1 + j]);
            
            if (leftArray[i] <= rightArray[j]) {
                this.array[k] = leftArray[i];
                i++;
            } else {
                this.array[k] = rightArray[j];
                j++;
            }
            
            // Update bar height
            const maxHeight = Math.max(...this.array);
            this.bars[k].style.height = `${(this.array[k] / maxHeight) * 100}%`;
            
            k++;
            await this.delay();
        }
        
        while (i < leftArray.length) {
            if (!this.isSorting) throw new Error('Stopped');
            
            this.array[k] = leftArray[i];
            const maxHeight = Math.max(...this.array);
            this.bars[k].style.height = `${(this.array[k] / maxHeight) * 100}%`;
            i++;
            k++;
            await this.delay();
        }
        
        while (j < rightArray.length) {
            if (!this.isSorting) throw new Error('Stopped');
            
            this.array[k] = rightArray[j];
            const maxHeight = Math.max(...this.array);
            this.bars[k].style.height = `${(this.array[k] / maxHeight) * 100}%`;
            j++;
            k++;
            await this.delay();
        }
    }
}

// Initialize the visualizer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SortingVisualizer();
});
