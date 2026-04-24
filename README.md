Mock Terminal UI (TerminalOverlay): Built a full-screen, backdrop-blurred mock terminal component
      (src/components/terminal-overlay.tsx).
       - It supports a bash-like command prompt layout with dynamic command histories.
       - Commands Supported:
           - help: Displays all available commands.
           - ls: Lists simulated directories (projects/, blog/, contact/) and files (resume.txt, about.txt).
           - cd <dir>: Validates the directory and actually utilizes Next.js router (router.push) to navigate your site
             behind the scenes, exiting the terminal automatically.
           - cat <file>: Reads and outputs the simulated contents of available text files.
           - clear, whoami, date, exit: Functional built-ins for a genuine terminal feel.