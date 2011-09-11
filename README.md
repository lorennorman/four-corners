# Four Corners
A (silly) project created in about 8 hours at the [AT&T Mobile Hackathon](http://www.mobileapphackathon.com) in Atlanta, GA on September 10th, 2011.

## Example Live at...
[Four Corners](http://four-corners.herokuapp.com/)

Visit that link on your "game board" (ie a shared space that players will be looking at, like a computer screen, projector, or centrally located tablet) and follow the "new game" link. The screen will prominently display a QR-Code to simplify mobile clients joining.

Now, with at least 4 mobile devices, pull out your QR-Code reader apps, follow the link, and you'll get to the game. Once 4 players have joined the game and chosen teams, the game will start!

Now: tap like mad to get the ball into your goal!

## Technologies Used
* [Rails 3.1](http://guides.rubyonrails.org) with [Asset Pipeline](http://guides.rubyonrails.org/asset_pipeline.html)
* [Heroku](http://heroku.com) on the [Celdon Cedar stack](http://devcenter.heroku.com/articles/cedar)
* [Faye](http://faye.jcoglan.com) for server-push pub/sub
* [Bit.ly API](http://code.google.com/p/bitly-api/wiki/ApiDocumentation) for automatic [QRCode](http://code.google.com/p/bitly-api/wiki/ApiDocumentation#QR_Codes)-to-URL generation
* [iPhone/JS touch events](http://www.sitepen.com/blog/2008/07/10/touching-and-gesturing-on-the-iphone/)

## Team
* [Blake Byrnes](https://github.com/blakebyrnes) idea, player-client
* [Calvin Yu](https://github.com/cyu) idea, server-client
* [Daniel Sims](https://github.com/dsims) idea, scope management, windows and android testing
* [Loren Norman](https://github.com/lorennorman) faye, deployment, bitly/qrcode integration
* [Stafford Brooke](https://github.com/srbiv) deployment, faye and asset pipeline troubleshooting
