# Project 5: Spots

Spots is as mock socail media website that will allow users to create and edit a profile, post pictures and like pictures posted by other users. The site is designed to be viewd differnetly on different size screens which is done through using grid layout and media queries to create a responive web page. As of project 4, the site now has a modal that allows users to edit the profile. Cards have also been changed so that they use Javascript to pull the image and name from an array of objects in the script file instead of having that hard coded into the html file.

## Project features

- grid layout
- media queries
- responsive design
- Javascript

### Grid Layout

In order to present the photos in a way that is responive to different screen sizes the photos are presented in an unordered list element that has a been set as display: grid in the css file. There the gird-template-column attribute can be set to be a way that sets the columns are a certian size and are in an number that fills the screen.

### Media Queries

When the screen is 627 px or less, serveral blocks have media queries added to them that will resize elements in the block to better fit on the screen.

### Responsive Design

Along with the afformentioned use of gird layout and media queries, absolute values are used for all line-height attributes. That means that line-heights will increase/decrease with the font-size without changing it in a media query.

### Javascript

Javascript functionallity allows for the edit profile button to pull a modal when clicked. This modal gives users a form that has been prefilled with the name and description from the profie. Here users can change the form, hit the save button, and alter the profile name and decription. The inital cards are now created using a template and an array of objects stored in the index.js file. The objects contain a name and link for each image. This array is then itterated over filling out a clone of the card template and inserting the clone into html file. As of project 5 users can now add cards using the "new post" button. Hitting the button will pull up a modal that asks for a url and caption that are used by the same function that created the inital cards. Cards have also had their functionallity expaned by using Javascript. Clicking the image will bring up a preview modal loads up the full image that was clicked on along with the caption underneath. The like buttton on each card now changes apperance when clicked on thanks to function in javascript. Finially a delete button has been added the cards that will delete it's corresponding card by removing its parent block form the html file.

## Imporvements

The edit porfile feature should let users change the avatar picture and all changes made by the user should be saved on refresh.

## Links

### Github pages

A link to the website as hosted by Github: https://chrisowens2244.github.io/se_project_spots/index.html
