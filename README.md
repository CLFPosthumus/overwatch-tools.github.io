# overwatch-tools.github.io
Home page for Overwatch Counter picker

Trello board
https://trello.com/b/1cebruiC/overwatch-hero-picker

[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/overwatch-tools/Lobby)

# Become a contributor

You are more than welcomed to help develop a better and more complete tool! This is why we putted the code out as open source!
Please for this repository at will and SUBMIT PULL REQUESTS! We will gladly review your ideas and integrate them into our base code.
 
# I want code, where do i start ?

## Dev stack
- You must know some javascript - the app is built on AngularJS 1.5 and uses ES6 syntax
- You must know some css, more specifically less transpiler
- You must have heard of node js and used gulp (or similar task runners)

## Getting the source and running the app locally

- Fork
- clone your fork on your computer
- You must have [nodejs](https://nodejs.org) installed. You can have any version > 4, but 6.X is recommended (we use babel transpiler, which runs more stable/fast on this version)
- From your clone directory, run the command
``` 
     npm install gulp gulp-cli -g
     npm install
     gulp
```

- Once the gulp task is ready, your default browser should open and show you the application properly running. There are watches on html, css and less files, so if you do any changes to those, your code will be automatically recompiled and your browser refreshed with the new changes.

## Re-integrate your code into our git repository 

The gulp task as an eslint (javascript validator) task that will warn you if your code does not meet our code styles standards.
Make sure that you have cleared all errors before submitting a pull request. 
You should also [rebase](https://git-scm.com/book/en/v2/Git-Branching-Rebasing) your work from the main repo to make sure that all conflicts are resolved before submitting the pull request.
