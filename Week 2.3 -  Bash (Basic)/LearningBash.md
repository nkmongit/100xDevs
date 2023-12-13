# Learning Bash Commands

1. `pwd`

   - `pwd` (Present Working Directory).
   - It shows the current directory you are in your terminal.
   - Terminal is nothing but a CLI (Command Line Interface), where we can
     do certain things (Opening files, folders, creating files, deleting em).

2. `cd`

   - `cd` (Change Directory).
   - This is used for changing directories through CLI.
   - We can navigate between folders using this command.
   - To go back a folder we use the command `cd ..`
   - To change navigate to other folders the command is `cd <directory path>`

3. `ls`

   - `ls` (Listing all the files and folders in the current directory).
   - This command will show the files and all the folders in the CLI that
     are present in your present working directory.

4. `mkdir`

   - `mkdir` (Make Directory).
   - This command is used for creating folders through CLI.

   ```bash
   <!-- Example -->
   mkdir programs

   ```

5. `touch`

   - `touch` command is used to creating files in the CLI.
   - Creatin a file inside the `programs` directory.

   ```bash
   <!-- Example -->
   cd programs
   touch index.js

   ```

6. `cat`

   - `cat` command is used to print the content of the certain file.

   ```bash
   <!-- Example -->
   cat index.js
   ```

7. `vim`

   - `vim` this is an extension for `vi` editor.
   - This editor runs on the CLI, that means you don't need any sort of
     text editor and can edit files using this CLI based text editor.

8. `mv`

   - `mv` (Move)
   - This command is used for moving things around, whether it be file or folder.

   ```bash
   <!-- Example -->
   mv index.js /User/Desktop/
   ```

9. `cp`

   - `cp` (Copy)
   - This command is used for copying files from one directory to another.

   ```bash
   <!-- Example -->
   cp index.js /User/Desktop/
   ```
