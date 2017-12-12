---
title: React YouTube Video Background
date: "2017-12-11"
path: "/react-youtube-background/"
image: "./img/react-youtube.jpg"
description: "Static website using Gatsby.js and React, using a YouTube video as the background."
---

The first time I saw a video background on a website, I became obsessed. I thought parallax backgrounds were cool, but this was on a different level! Most video backgrounds use the video tag, paired with a small video file that's optimized for the web. With some CSS, you can set the looping video as a background. There are some sites that offer free video backgrounds for download, such as https://coverr.co/.

Eventually, I stumbled upon a [jQuery plugin](https://github.com/pupunzi/jquery.mb.YTPlayer) that converts a YouTube video into a background. The plugin takes in a YouTube video id and sets the background for you, using an `<iframe>` instead of the `<video>` tag. I had experimented with this plugin on previous sites, but was curious if it can be re-created using Gatsby.js and React.

<h4 class="mt-4 mb-4"><a href="http://hc-gatsby-videobg.surge.sh/">React.js YouTube Video Background</a> <small>( <a href="https://github.com/ChangoMan/react-videobg-demo">view source</a> )</small></h4>

For this demo, I'm going to be using Gatsby.js and a starter that I've created. In reality, you can do this with any React app, you don't have to use Gatsby if you don't want to. The starter just gives us some content and a layout to work with.

```bash
gatsby new gatsby-videobg https://github.com/ChangoMan/gatsby-starter-dimension
cd gatsby-videobg
gatsby develop
```

If you go to `http://localhost:8000/` you'll see something like this: http://gatsby-dimension.surge.sh/

Time to kick it up a notch! We'll be installing a React component that plays YouTube videos. There are several to choose from, but I ended up using https://github.com/troybetz/react-youtube

```bash
yarn add react-youtube
gatsby develop
```

Open up the main component at `/src/layouts/index.js` and import the new React component up at the top:

```jsx
import React from 'react'
import '../assets/scss/main.scss'
import Helmet from 'react-helmet'
import YouTube from 'react-youtube';
```

For the most part, we can leave everything as is. We just need to comment out the existing `<div id="bg"></div>` and add in the `<YouTube />` component and some options. We'll also add some additional HTML structure around the component for styling purposes. The render method should look something like this:

```jsx
_onReady(event) {
  // access to player in all event handlers via event.target
  // event.target.mute();
}

_onEnd(event) {
  event.target.playVideo();
}

render() {
  const siteTitle = this.props.data.site.siteMetadata.title
  const siteDescription = this.props.data.site.siteMetadata.description

  const videoOptions = {
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0
    }
  };

  return (
    <div className={`body ${this.state.loading} ${this.state.isArticleVisible ? 'is-article-visible' : ''}`}>
      <Helmet>
          <title>{siteTitle}</title>
          <meta name="description" content={siteDescription} />
      </Helmet>

      <div id="wrapper">

        <Header onOpenArticle={this.handleOpenArticle} timeout={this.state.timeout} />
        <Main
          isArticleVisible={this.state.isArticleVisible}
          timeout={this.state.timeout}
          articleTimeout={this.state.articleTimeout}
          article={this.state.article}
          onCloseArticle={this.handleCloseArticle}
        />
        <Footer timeout={this.state.timeout} />

      </div>
      {/*<div id="bg"></div>*/}

      <div className="video-background">
        <div className="video-foreground">
          <YouTube
            videoId="Z6FPJOgfCkc"
            opts={videoOptions}
            className="video-iframe"
            onReady={this._onReady}
            onEnd={this._onEnd}
          />
        </div>
      </div>
    </div>
  )
}
```

The `<YouTube>` component needs a `videoId` and a set of options, which I've defined as `videoOptions`. We've also added two methods to execute when the player starts and ends. `_onReady()` is where you can mute the video if needed, or adjust other parameters such as video quality. `_onEnd()` fires when the video ends, and here we do a `playVideo()` to do a loop. Check out the [react-youtube docs](https://github.com/troybetz/react-youtube) for more uses and options.

That's pretty much it! We'll need to add some CSS to make the resulting `<iframe>` cover the entire background.

Create a new Sass file at `/src/assets/scss/_video.scss` with the following:

```scss
.video-background {
    background: #000;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: -99;
    &::after {
        display: block;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        background: rgba(0,0,0,0.75)
    }
}
.video-foreground,
.video-background iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

@media (min-aspect-ratio: 16/9) {
    .video-foreground { height: 300%; top: -100%; }
}
@media (max-aspect-ratio: 16/9) {
    .video-foreground { width: 300%; left: -100%; }
}
```

Make sure to import this into the main Sass file at `/src/assets/scss/main.scss`. You can obviously adjust any of the CSS for the video background, as well as any of the options that go into `<YouTube>`. You could also create an array of video ids or a playlist, and play a random video each time the site loads. Here's a branch I made that implements a random video: https://github.com/ChangoMan/react-videobg-demo/tree/random-video

<h4><a href="http://hc-gatsby-videobg.surge.sh/">Finished Product</a> <small>( <a href="https://github.com/ChangoMan/react-videobg-demo">view source</a> )</small></h4>