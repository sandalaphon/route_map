var MakeRequest = require('./make_requests.js')

var Reviews = function(currentRoute){
  this.currentRoute = currentRoute;
}

Reviews.prototype = {

  populateReviews: function(){

    // Set object context
    var reviewsObjectContext = this;

    // Get HTML Element and set display to visible
    var reviewsDiv = document.querySelector('#reviews-info');
    reviewsDiv.style.display = 'inline';

    // Get HTML list object
    var reviewsHTMLObject = document.querySelector('#review-list');

    // Empty it if full
    while (reviewsHTMLObject.hasChildNodes()) {
        reviewsHTMLObject.removeChild(reviewsHTMLObject.lastChild);
    }

    // Get the HTML Review button, add listener
    var submitReviewButton = document.querySelector('#submitReview');
    submitReviewButton = addEventListener('click', function(){

      var submittedReviewText = document.querySelector('#reviewField').value
      var submittedReviewName = document.querySelector('#nameField').value
      var submittedReviewRating = document.querySelector('#ratingField').value

      var review = {
        reviews: [{
          "name": submittedReviewName,
          "headline": "",
          "rating": submittedReviewRating,
          "reviewText": submittedReviewText
        }]
      }

      console.log(reviewsObjectContext.currentRoute)

      reviewsObjectContext.currentRoute.reviews.forEach(function(oldReview){
        review.reviews.push(oldReview)
      }) 

      console.log(review)

      var routeIDUrl = 'http://localhost:3000/api/suggested_routes/'
      routeIDUrl += reviewsObjectContext.currentRoute._id
      console.log("URL", routeIDUrl)
      var putRequest = new MakeRequest()
      var jsonString = JSON.stringify(review)
      putRequest.makePutRequest(routeIDUrl, function(){
        console.log('This one', reviewsObjectContext.currentRoute._id)
      }, jsonString);

      console.log('Have we got this far?')
    })

    this.currentRoute.reviews.forEach(function(reviewItem){
      var reviewLi = document.createElement('li');
      var reviewHeadline = document.createElement('h3');
      var reviewReviewer = document.createElement('p');
      var reviewP = document.createElement('p');
      var starsDiv = document.createElement('div');
      var hrDivider = document.createElement('hr');

      var numberofGreyStars = 5 - reviewItem.rating;

      for (i = 0; i < reviewItem.rating; i++){
        var goldStar = document.createElement('img')
        goldStar.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gold_Star.svg/2000px-Gold_Star.svg.png"
        goldStar.style.height = "20px"
        goldStar.style.width = "20px"
        starsDiv.appendChild(goldStar)
      }

      for (i = 0; i < numberofGreyStars; i++){
        var greyStar = document.createElement('img')
        greyStar.src = 'http://www.clker.com/cliparts/T/0/N/2/O/Z/grey-blue-star-md.png'
        greyStar.style.height = "20px"
        greyStar.style.width = "20px"
        starsDiv.appendChild(greyStar)
      }

      reviewHeadline.innerText = reviewItem.headline;
      reviewReviewer.innerText = reviewItem.name;
      reviewP.innerText = reviewItem.reviewText;
      reviewsHTMLObject.appendChild(reviewLi)
      reviewsHTMLObject.appendChild(reviewHeadline)
      reviewsHTMLObject.appendChild(starsDiv)
      reviewsHTMLObject.appendChild(reviewReviewer)
      reviewsHTMLObject.appendChild(reviewP)  
      reviewsHTMLObject.appendChild(hrDivider)
    })
  }

}

module.exports = Reviews;