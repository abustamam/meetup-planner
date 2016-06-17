This app is my project submission for the Senior Web Developer Nanodegree: Project 1: Meetup Event Planner.

## Features

- React/Flux
- Sass 

## Instructions for use

### The easy way

Visit my deployed site: http://abustamam.github.io/meetup-planner

### The hard way

- Install dependencies:

```
npm install
```

- Run the server:

```
npm start
```

Open http://localhost:8080/ in your favorite web browser.

## To build

Run `npm run build` to tell Webpack that it is a production build. This will minify assets to prepare for deployment. 

`npm run deploy` will run `npm run build` before deploying to `gh-pages` branch.

## Description

This app took me about a week to build, despite it being so simple. I took this opportunity to learn responsive web design and Sass, which explains why it took so long. 

### Flow

Every app begins with a story, and this story begins with you (the user). 

The app places you directly into a `New User` screen. Here you can fill in some basic things about yourself, and get a helpful error if something went wrong (can't tell you how many times I've accidentally typed "gmail.cmo" -- my regex will catch that)

However, I won't force you to create an account if all you want to do is create an event. Go ahead--click on "New Event" to go straight to the event creation screen. 

There, you can create your event. That's pretty self-explanatory. 

And finally, once you do that, you can view all the events you've created! Note that data is not stored anywhere, so all your hard work will disappear once you load the page again. So don't spend too much time on the details. My browser now thinks my name is 'aaa' because of how many time's I've tested it.

### UX

Against my better judgment, I let UX hold me up at many points of the app. I needed a color scheme! So I used Meetup's red color scheme. But then I needed errors to be red. It looked really weird for errors to be red and everything else to be red too--it didn't stand out. So I opted for a sort of a complement to red--teal. And it's just basic teal. And I found I really liked that color. 

After that, I wanted to follow some sort of Material design. I tried using [Material UI](http://material-ui.com) but it wasn't extensible enough for me to add icons and such. So, I created my own components. 

You'll see that a lot of state changes when an input box is selected--there's a teal bottom border, the icon turns teal, and the associated label turns teal as well. This makes it easy for the user to see all elements that are related to what they've currently selected. 

One of my favorite parts of this app is that the 'event type' parameter has a little bit of smarts. Go ahead and type in 'birthday'--the icon changes! That was really fun to program.

Another thing I enjoyed doing was creating a few custom icons. Most icons I pulled straight from [Google Material Icons](http://design.google.com/icons/) but I created a few of my own; namely the icon for Event Name, Start Time, and End Time. It was fun to create my own SVG icons, as annoying as the math could be at times. 

Something that took me a significant amount of time to think about, but only a day's worth of work to program, was the guest list. How was I supposed to ensure that there was always one more input box than there were guests? 

But eventually I somehow magically got it to work. Of course, it's not perfect--you can't delete or remove guests, but maybe that's a future feature. 

However, I personally think it's really cool that the app changes the user icon--if there is a user, the icon is filled! If not, it's transparent. 

## Future Features

I probably won't be maintaining this app, since it doesn't really do anything, but here are some things I wish I could add:

- Make `textarea` shrink when users delete lines
- Add deletion of guests in list

## Misc

Bug reports can go to me: [Rasheed Bustamam](rasheed.bustamam@gmail.com)


## Resources

[React Hot Boilerplate](https://github.com/gaearon/react-hot-boilerplate)
[SurviveJS](http://survivejs.com)