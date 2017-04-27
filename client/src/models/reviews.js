var ReviewTemplate = require('./review_template.js')

var MakeRequest = require('./make_requests.js')

var Reviews = function(){
  this.currentRoute = null;
  this.reviewsHTMLObject = null;
  this.currentDisplayedReviewID = null;
}

Reviews.prototype = {

  setupReviewsHTML: function(){
    // Get HTML Element and set display to visible
    reviewsDiv = document.querySelector('#reviews-info');
    reviewsDiv.style.display = 'inline'
    reviewList = document.querySelector('#review-list')
    reviewList.style.display = 'inline'
    reviewsHeadingsDiv = document.querySelector('#review-heading')
    reviewsHeadingsDiv.style.display = 'inline'

    // Get HTML list object
    this.reviewsHTMLObject = document.querySelector('#review-list');
  },

  findAllRouteIDs: function(suggestedRoutesResponse){
    var ids = []
    suggestedRoutesResponse.forEach(function(element){
      ids.push(element._id)
    })
    return ids
  },

  findAllReviewsByGivenId: function(suggestedRoutesResponse, allRouteIDs){
    var reviewsArray = []
    suggestedRoutesResponse.forEach(function(suggestedRoute){
      allRouteIDs.forEach(function(element){
        if (suggestedRoute._id === element){
          var reviewTemplate = new ReviewTemplate(suggestedRoute._id, suggestedRoute.reviews)
          reviewsArray.push(reviewTemplate)
        }
      })
    })
    return reviewsArray
  },

  createHTMLElementsForEachReview: function(allRoutesWithIDs){

    var mainInfoDiv = document.querySelector('#reviews-info')

    var reviewObjectContext = this;

    allRoutesWithIDs.forEach(function(routeWithID){

      var reviewMainDiv = document.createElement('div');
      reviewMainDiv.id = routeWithID.id;
      reviewMainDiv.margin = '100px'
      reviewMainDiv.style.display = 'none'

      var mainReviewHeading = document.createElement('h3')
      mainReviewHeading.innerText = "Reviews"
      reviewMainDiv.appendChild(mainReviewHeading)

      var reviewHeadingDivider = document.createElement('br')
      reviewMainDiv.appendChild(reviewHeadingDivider)

      var subReviewHeading = document.createElement('p')
      subReviewHeading.innerText = 'Submit Your Review:'
      reviewMainDiv.appendChild(subReviewHeading)

      var subReviewHeadingDivider = document.createElement('br')
      reviewMainDiv.appendChild(subReviewHeadingDivider)

      var headlineSpan = document.createElement('span');
      headlineSpan.innerText = 'Headline:\n'
      reviewMainDiv.appendChild(headlineSpan)

      var headlineField = document.createElement('input');
      headlineField.type = 'text';
      headlineField.id = 'headlineField'
      headlineField.id += routeWithID.id;
      headlineField.style.display = 'inline-block'
      headlineField.style.marginLeft = 'auto'
      headlineField.style.marginRight = 'auto'
      reviewMainDiv.appendChild(headlineField)

      var reviewHeadingP = document.createElement('p');
      reviewHeadingP.innerText = 'Review:\n'
      reviewMainDiv.appendChild(reviewHeadingP)

      var textarea = document.createElement('textarea');
      textarea.id = 'reviewField'
      textarea.id += routeWithID.id;
      textarea.style.display = 'block'
      textarea.name = 'ReviewText'
      textarea.cols = "47"
      textarea.rows = "4"
      textarea.style.marginLeft = 'auto'
      textarea.style.marginRight = 'auto'
      reviewMainDiv.appendChild(textarea)

      // var lineBreak = document.createElement('br')
      // reviewMainDiv.appendChild(lineBreak)

      var reviewerNameSpan = document.createElement('span')
      reviewerNameSpan.innerText = "Name:  "
      reviewMainDiv.appendChild(reviewerNameSpan)

      var reviewNameField = document.createElement('input')
      reviewNameField.type = 'text'
      reviewNameField.id = 'nameField'
      reviewNameField.id += routeWithID.id
      reviewMainDiv.appendChild(reviewNameField);

      var reviewerRating = document.createElement('span')
      reviewerRating.innerText = "Rating:  "
      reviewMainDiv.appendChild(reviewerRating)

      var reviewRatingField = document.createElement('input')
      reviewRatingField.type = 'text'
      reviewRatingField.id = 'ratingField'
      reviewRatingField.id += routeWithID.id
      reviewMainDiv.appendChild(reviewRatingField);

      var submitButton = document.createElement('button')
      submitButton.id = 'submitReview'
      submitButton.id += routeWithID.id; // assign each button unique id
      submitButton.innerText = "Submit"

      reviewMainDiv.appendChild(submitButton)

      var spaceAfterButton = document.createElement('br')
      reviewMainDiv.appendChild(spaceAfterButton)
      
      // Rating

      routeWithID.reviews.forEach(function(element){
        var reviewLi = document.createElement('li');
        reviewLi.style.listStyle = 'none'

        var reviewHeadline = document.createElement('h3');
        reviewHeadline.innerText = element.headline
        reviewMainDiv.appendChild(reviewHeadline)

        var starsDiv = document.createElement('div');
        reviewMainDiv.appendChild(starsDiv)

        var reviewReviewer = document.createElement('p');
        reviewReviewer.innerText = element.name
        reviewMainDiv.appendChild(reviewReviewer)

        reviewLi.innerText = element.reviewText;
        reviewMainDiv.appendChild(reviewLi);  

        var brDivider = document.createElement('br');
        reviewMainDiv.appendChild(brDivider)


        var numberofGreyStars = 5 - element.rating;
        // console.log(numberofGreyStars)

        for (i = 0; i < element.rating; i++){
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

      })

      mainInfoDiv.appendChild(reviewMainDiv)
    })
  },

  revealReviewsForCurrentRoute: function(currentSuggestedRoute){
    
    // If it's already populated, hide the previous div

    if (this.currentDisplayedReviewID) {
      var existingReviewHTMLObject = document.getElementById(this.currentDisplayedReviewID)
      console.log(existingReviewHTMLObject)
      existingReviewHTMLObject.style.display = 'none'
      console.log(existingReviewHTMLObject)
    }

    // Set the correct HTML div to display

    this.currentDisplayedReviewID = currentSuggestedRoute._id;
    console.log(this.currentDisplayedReviewID)
    var newReviewHTMLObject = document.getElementById(this.currentDisplayedReviewID);
    console.log(newReviewHTMLObject)
    newReviewHTMLObject.style.display = 'inline'
    console.log(newReviewHTMLObject)

    console.log(this)
    this.submitReview()

  },

  submitReview: function(){

    console.log(this)

    var correctButtonId = 'submitReview'
    correctButtonId += this.currentDisplayedReviewID
    console.log(correctButtonId)
    var submitButton = document.getElementById(correctButtonId)
    console.log(this.currentDisplayedReviewID)
    var reviewsObjectContext = this;
    var returnedReviewsArray = []

    submitButton.addEventListener('click', function(){
      console.log('clicked')

      var request = new XMLHttpRequest();
      var routeIDUrl = "http://localhost:3000/api/suggested_routes/"
      routeIDUrl += reviewsObjectContext.currentDisplayedReviewID
      request.open("GET", routeIDUrl)
      request.setRequestHeader("Content-Type", "application/json");
      request.onload = function(){
        if(request.status!== 200){
          console.log('Error')
          return
        }
        var jsonString = request.responseText;
        var parsedResponse = JSON.parse(jsonString)
        console.log(parsedResponse)
        console.log(parsedResponse[0].reviews)
        returnedReviewsArray = parsedResponse[0].reviews

        // Get the HTML Review button, add listener

        var reviewTextCorrectId = "#reviewField";
        reviewTextCorrectId += reviewsObjectContext.currentDisplayedReviewID;
        
        var reviewNameCorrectId = "#nameField";
        reviewNameCorrectId += reviewsObjectContext.currentDisplayedReviewID;
        
        var reviewRatingCorrectId = "#ratingField";
        reviewRatingCorrectId += reviewsObjectContext.currentDisplayedReviewID;

        var reviewHeadlineCorrectId = "#headlineField";
        reviewHeadlineCorrectId += reviewsObjectContext.currentDisplayedReviewID;

        var submittedReviewText = document.querySelector(reviewTextCorrectId).value
        var submittedReviewName = document.querySelector(reviewNameCorrectId).value
        var submittedReviewRating = document.querySelector(reviewRatingCorrectId).value
        var submittedReviewHeadline = document.querySelector(reviewHeadlineCorrectId).value

        var newReview = {
            "name": submittedReviewName,
            "headline": submittedReviewHeadline,
            "rating": submittedReviewRating,
            "reviewText": submittedReviewText
        }

        returnedReviewsArray.push(newReview);
        reviewsToReturnObject = {}
        reviewsToReturnObject['reviews'] = returnedReviewsArray

        var arrayToReturn = JSON.stringify(reviewsToReturnObject)

        var currentDisplayedReviewIDmain = reviewsObjectContext.currentDisplayedReviewID;

        var newRequest = new XMLHttpRequest()
        var routeIDUrl = "http://localhost:3000/api/suggested_routes/"
        routeIDUrl += reviewsObjectContext.currentDisplayedReviewID
        newRequest.open("PUT", routeIDUrl)
        newRequest.setRequestHeader("Content-Type", "application/json");
        newRequest.send(arrayToReturn)
        console.log(arrayToReturn)
        console.log(newRequest)
        
      }
      request.send()
        
      })
              
    }

  }


module.exports = Reviews;