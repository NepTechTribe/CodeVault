# Sorting Algorithm Visualizer

An interactive web application that visualizes different sorting algorithms in real-time, making it easier to understand how sorting algorithms work.

## Features

- **5 Sorting Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Quick Sort, and Merge Sort
- **Real-time Visualization**: Animated bars that show the sorting process step by step
- **Interactive Controls**: 
  - Adjustable array size (10-100 elements)
  - Speed control (1-10 levels)
  - Start/Stop functionality
- **Live Statistics**: 
  - Comparison count
  - Swap count
  - Execution time
- **Educational Content**: 
  - Algorithm descriptions
  - Time and space complexity information
- **Responsive Design**: Works on desktop and mobile devices

## How to Use

1. Open `index.html` in your web browser
2. Select a sorting algorithm from the dropdown
3. Adjust the array size and speed using the sliders
4. Click "Generate New Array" to create a random array
5. Click "Start Sorting" to begin the visualization
6. Watch as the bars animate to show the sorting process
7. Observe the statistics updating in real-time

## Visual Indicators

- **Blue bars**: Normal state
- **Red bars**: Currently being compared
- **Teal bars**: Currently being swapped
- **Green bars**: Sorted elements

## Algorithms Included

### Bubble Sort
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- Repeatedly compares adjacent elements and swaps them if they're in the wrong order

### Selection Sort
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- Finds the minimum element and swaps it with the first unsorted element

### Insertion Sort
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- Builds the sorted array one element at a time by inserting each element into its correct position

### Quick Sort
- **Time Complexity**: O(n log n) average, O(n²) worst case
- **Space Complexity**: O(log n)
- Uses divide-and-conquer approach with a pivot element

### Merge Sort
- **Time Complexity**: O(n log n)
- **Space Complexity**: O(n)
- Divides the array into halves, sorts them recursively, then merges them back

## Technical Details

- Built with vanilla HTML, CSS, and JavaScript
- No external dependencies
- Responsive design with CSS Grid and Flexbox
- Smooth animations using CSS transitions
- Async/await for proper timing control

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Educational Value

This visualizer helps students and developers:
- Understand how different sorting algorithms work
- See the difference in performance between algorithms
- Learn about time and space complexity
- Visualize abstract concepts in computer science

Perfect for computer science education, coding bootcamps, and self-learning!
