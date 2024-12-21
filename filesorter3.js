import fs from 'fs'; // Use ES module syntax for importing
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Function to sort files by extension first, then name
async function sortFilesInDirectory(directory) {
    // Step 1: Read all files in the directory
    const fileList = await fs.promises.readdir(directory);

    // Step 2: Map files into objects with 'name' and 'extension'
    const fileDetails = fileList.map(file => {
        const ext = path.extname(file);
        const name = path.basename(file, ext);

        return {
            original: file,
            name: name.toLowerCase(),
            extension: ext ? ext.substring(1).toLowerCase() : ""
        };
    });

    // Step 3: Sort the files
    fileDetails.sort((a, b) => {
        if (a.extension < b.extension) return -1;
        if (a.extension > b.extension) return 1;
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });

    // Step 4: Print the sorted list
    console.log("Sorted Files by Extension and Name:");
    fileDetails.forEach(file => console.log(file.original));
}

// Step 5: Resolve current directory and run the program
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
sortFilesInDirectory(__dirname);
