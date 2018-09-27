# 16-mind-over-money

## Table of contents
  
### 1-Description
### 2-Technologies
### 3-Challenges & Learning
### 4-Known Issues
### 5-Future Development
### 6-Contributors

### 1-Description
I wanted to build another large-ish (large-ish for a personal project) full-stack app to keep in practice and to see what I could learn from it. This app reproduces the functionality from an Excel spreadsheet I sometimes use to track my finances. I've sporadically developed and added to it (the spreadsheet) over the years, so there's a bit of complexity to it, which made it an interesting web development project. It tracks specific categories of spending that you designate yourself (e.g. Food, Entertainment, Car Repair, Gas); it automatically tallies the average you spend on each monthly bill (with the sheet I have to highlight what I want averaged); it compares spending to income in real money and analyzes credit card spending vs payments (and whether your pattern is accruing or decreasing debt), then displays the differences along with a brief reminder blurb of advice to emphasize (in simple, broad terms) what adjustments are would help.


### 2-Technologies
  This project utilizes the following:
- HTML
- CSS
- Vanilla JavaScript
- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- Cookies, Local Storage
- [MySQL](https://www.mysql.com/)
- [Sequelize]()
- [React Table](https://react-table.js.org/#/story/readme)
- [Passport.js](http://www.passportjs.org/)
- And several other packages, such as axios, bcrypt-nodejs, date-fns, money-math, and react-currency-formatter.

### 3-Challenges & Learning
There weren't too many difficulties in creating this app as it stands now. But difficulty wasn't my intention - broadening my understanding was. I just wanted to learn more depth as I went along. Things like more clarity and or subtlety in file structure and modularity, or class methods vs instance methods. In a forked copy, I refactored the app to use MySQL directly (sans Sequelize) and during the course of it learned more about promises by creating them in my models. This project added to my larger picture understanding of the MVC file structure in relation to cycle in a web app (user action > whatever client-side functionality > API call > router > controller > model > database > functionality > client-side functionality > display). I gained a greater understanding of classes, promises, closures, Object class methods, modularity, helper files, and it's given me some (as yet unimplemented) ideas for controlling user interaction flow.

### 4-Known Issues
Some of the table filters don't work properly due to the way the data is rendered within the cells. This may be corrected in a future version.
If you find anything else, feel free to submit a PR, or just tell me about it. BKAShambala@gmail.com.

### 5-Future Development
  Some features I'd like to add once I've either used it a while and have some data to work with or I take the time to acquire/write some seed data for it.
1.  Graphs for patterns and trends
2.  (which means developing more detailed number-crunching functionality all around)
3.  Use the app as a playground for learning more advanced CSS (the original version had a lot of animated buttons that expanded into each section on click. It looked cool but made the app a little more time-consuming to use.)
4.  Incorporate a miniature version of it into my Portfolio site (maybe just the balances and transactions components)
5.  Refine the app to adhere to what I learned from building it: better planning leads to better organization, better file structure, better separation of concerns, better modularity.

### 6- Contributors
  Just me.


TO ADD TO THIS README:
  This app is a personal project that recreates the functionality of a budgeting Excel workbook that has been in development and use for personal finances over several years.

It offers detailed records and an at-a-glance summary of balances and trends. It records monthly bills, credit card payments, savings deposits, and checking and credit card expenses.

It is customizable in that you name your accounts, you decide how many accounts you wish to track, how many bills you wish to track, and which categories of expenses you wish to track. Categories can be tracked regardless of which spending method you use (checking, which credit card, etc.). It also averages expenses by month.

Part of the challenge of this project (and this is an ongoing challenge) is making the app functionality as easy and clear as just using the original spreadsheet. Excel does all of the things this app does (and several it doesn't) fairly well and easily, too, so this is no small challenge. There are nuances in the sorting methods that could be improved. There could be more information with each entry on the homepage (like the usual amount due on predictable bills, like a mortgage, car payment, etc.). The page layout needs improvement and the logo, while cool to learn as a first step into SVG, looks very 90s to me, so it'll eventually get a redesign. It should be smaller after sign-in to make more room for the UI.

But those will be put on hold for a bit while I build a couple smaller projects to explore some new ideas I learned from this one.