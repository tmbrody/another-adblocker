# another-adblocker

This version of the Chrome/Edge extension offers a single feature: the ability to remove elements from webpages through the use of classNames and IDs. To use it, follow these steps:

1. **Setup**:
   - Make sure you have the necessary build file by running `npx webpack` in your project directory.

2. **Installation**:
   - Open your Chrome/Edge browser.
   - Go to the Extension settings page.
   - Enable "Developer mode."
   - Click "Load unpacked."
   - Select the folder containing all the project files.

3. **Usage**:
   - Hover your mouse over an element on a webpage.
   - Move the mouse slightly before holding down the Shift key for 2 seconds.
   - The webpage will automatically refresh, and a class or ID associated with the selected element will be removed.
   - Repeat the first three steps to keep removing classes or IDs until the desired element has been removed from the webpage.