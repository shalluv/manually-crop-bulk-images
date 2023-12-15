# Manually Crop Bulk Images

> ⚠️Warning: This program is built for personal use. It is not tested for general use. Use at your own risk.

## Prerequisites

- [Node.js](https://nodejs.org/en/) (>= 18.0.0)
- pnpm (>= 8.0.0)

## Get Started

1. Clone this repository.
2. Install dependencies.

   ```bash
   pnpm install
   ```

3. Put your images in the `/src/assets/` folder.
4. Run the rename script to rename all images in the `/src/assets/` folder to a 3-digit number with the original file extension. This step is necessary for the program to work.

   > ⚠️Warning: The rename script can cause problems if you don’t know what you’re doing. Please read the script before running it.

   ```bash
   pnpm rename
   ```

5. Run the script by executing the following command:

   ```bash
   pnpm build
   pnpm preview
   ```

6. Open `http://localhost:4321` in your browser.
7. You should be good to go!

## How to Use

1. Click on the image you want to crop.
2. Select 4 points on the image to create a rectangle.
3. Adjust the rectangle by dragging the points.
4. Click the "Confirm" button to crop the image.
5. Repeat these steps for all images.

## Limitations

- The program only supports cropping images to a rectangle.
- The program only test with images in the `.jpg` format.
- The program only capable of 999 images.
  - You can adjust the limit by yourself

## Contributing

Suggestions, issues, and pull requests are welcome!
Feel free to do it! 😘
