
var stage_left = (($('body').width() - 866) / 2);
var stage_top = 30;

var fish = {

  kill: function(){
    showAction('Fish', 'dying')

    var arc1 = {
        center: [560,450],  
        radius: 100,    
        start: 45,
        end: 0,
        dir: 1
    };

    $('#fish').fadeOut('fast');

    $('#fish_alone').animate({path : new $.path.arc(arc1)}, function(){
      $('#fish_alone').css('background-image', 'url(/images/animations/FishDied.gif)');
    });

    actionDone('Fish');
  },

}

var man = {
  init: function(){
    man.walkRight();
  },

  walkRight: function(){
    showAction('Man', 'walking right');
    $('#man').css('background-image', 'url(/images/animations/Man.gif)');
    $( '#man' ).animate({ 'left': '+=75%' }, 10000, function(){
      $('#man').css('background-image', 'url(/images/animations/ManIdle.gif)');
      actionDone('Man');
    });
  },

  walkLeft: function(){
    showAction('Man', 'walking left');
    $('#man').css('background-image', 'url(/images/animations/Man.gif)');
    $( '#man' ).animate({ 'left': '-=75%' }, 6000, function(){
      $('#man').css('background-image', 'url(/images/animations/ManIdle.gif)');
      actionDone('Man');
    });
  },
};


var cat = {

  walkLeft: function(){
    showAction('Cat', 'walking left');
    $('#cat').css('background-image', 'url(/images/animations/Cat.gif)');
    $( '#cat' ).animate({ 'right': '+=75%' }, 3000, function(){
      $('#cat').css('background-image', 'url(/images/animations/CatIdle.gif)');
      actionDone('Cat');
    });
  },

  walkRight: function(){
    showAction('Cat', 'walking right')
    $('#cat').css('background-image', 'url(/images/animations/Cat.gif)');
    $( '#cat' ).animate({ 'right': '-=75%' }, 3000, function(){
      $('#cat').css('background-image', 'url(/images/animations/CatIdle.gif)');
      actionDone('Cat');
    });
  },

  kill: function(){
    showAction('Cat', 'dying')
    $('#cat').effect('bounce', null, 500, function(){
      actionDone('Cat');
    });
    $('#cat').css('background-image', 'url(/images/animations/CatDead.png)');
  },

  revive: function(){
    showAction('Cat', 'living again')
    $('#cat').fadeOut('slow', function(){
      $('#cat').css('background-image', 'url(/images/animations/CatIdle.gif)');
      $('#cat').fadeIn('slow', function(){
        actionDone('Cat');
      });
    });
  },
}

function disableCharacterActions(character){
  $('.action-' +  character).attr('disabled', 'disabled');
}


function enableCharacterActions(character){
  $('.action-' +  character).removeAttr('disabled');
}

function showAction(character, action){
  disableCharacterActions(character);
  $('#tell-user').html('The ' + character + ' is ' + action);
  $('#tell-user').fadeIn('slow');
}

function actionDone(character){
  $('#tell-user').fadeOut('slow');
  enableCharacterActions(character)
}