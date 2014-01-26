
landing = {
  init: function(){
    landing.fancyCaption();
    landing.fancyLogo();
    landing.scrollToTop();
    landing.fancySignup();
    landing.fancyNav();
    landing.signup();
    landing.fancyMore();
    landing.referralEmailPopulate();
    landing.forgotPassword();
    landing.passwordResetListener();
    edit.specialtyImport();
  },

  fancyLogo: function(){
    $('.landing-promo-logo > img').fadeIn('slow');
  },

  fancyCaption: function(){
    $('.landing-promo-logo > .caption').delay('1000').fadeIn('2000', function(){
      $(this).toggleClass('caption-unloaded','');
      $('.landing-promo-signup').fadeIn('slow');
      $('.landing-client-signup').fadeIn('slow');
      $('.landing-nav').fadeIn('slow');
    });
  },

  fancySignup: function(){
    var on = false;

    var physicianButtonText = "For Physicians";
    var physicianSignup = $('.signup-slider');
    var physicianButton = $('.landing-promo-signup');

    var clientButtonText = "For Clients";
    var clientButton = $('.landing-client-signup');
    var clientSignup = $('.signup-slider-2');

    var anchor = $('html, body');

    clientButton.click(function(){
      physicianButton.text(physicianButtonText);
      if (clientButton.text() == "Cancel" && physicianButton.text() != "Cancel")
      {
        clientButton.text(clientButtonText);
        clientSignup.hide('slide', {direction: 'up'}, 'fast');
        anchor.animate({
          scrollTop: 0
          }, '500');
      }
      else if(on && !clientButton.text() == "Cancel"){
        clientButton.text(clientButtonText);
        clientSignup.hide('slide', {direction: 'up'}, 'fast');
        anchor.animate({
          scrollTop: 0
          }, '500');
        }
      else {
        clientButton.text('Cancel');
        clientSignup.show('slide', {direction: 'up'}, 'fast');
        physicianSignup.hide();
        anchor.animate({
          scrollTop: 432
        }, '500');
      }
      (on ? on = false : on = true);
    });

    physicianButton.click(function(){
      clientButton.text(clientButtonText);
      if (physicianButton.text() == "Cancel" && clientButton.text() != "Cancel")
      {
        physicianButton.text(physicianButtonText);
        physicianSignup.hide('slide', {direction: 'up'}, 'fast');
        anchor.animate({
          scrollTop: 0
          }, '500');
      }
      else if(on && !physicianButton.text() == "Cancel"){
        physicianButton.text(physicianButtonText);
        physicianSignup.hide('slide', {direction: 'up'}, 'fast');
        anchor.animate({
            scrollTop: 0
        }, '500');
      }
      else {
        physicianButton.text('Cancel');
        physicianSignup.show('slide', {direction: 'up'}, 'fast');
        clientSignup.hide();
        anchor.animate({
            scrollTop: 432
        }, '500');
      }
      (on ? on = false : on = true);
    });
  },

  forgotPassword: function(){
    var form = $('#password-reset-form');
    dialogs.additionalDisplayTrigger('#forgot-password-link', '#passwordResetBox');
    $('#password-reset-form')
    .submit(function(e){
      e.preventDefault();
      $.ajax({
        url: '/forgot-my-password',
        type: 'POST',
        data: form.serialize(),
        success: function(){
          landing.forgotPasswordSuccess(form);
        }
      });
    });

  },

  forgotPasswordSuccess: function(form){
    form.replaceWith('<span class="txtL">\
                Please check your inbox for details on how to reset your password.\
               </span>');
  },

  passwordResetListener: function(){
    var url = window.location.href;
    var dialog = null;
    var content = '';
    var token = url.split("?resetToken=")[1];


    if(token && token.length > 0){
      content = '<form id="resetPasswordForm" class="resetPasswordForm txtR">\
                    <span class="txtL">Please set your new password</span>\
                    <input name ="password" id="newPassword" type="password" placeholder="Password"></input>\
                    <input name ="passwordConf" id="newPasswordConfirmation" type="password" placeholder="Password Confirmation"></input>\
                    <input type="submit" class="btn btn-danger" value="Reset Password" />\
                 </form>\
                ';

      dialog = dialogs.generateNew('passwordResetDialog','Reset Your Password', content);
      $('body').append(dialog);
      landing.setNewPasswordApproval(token);
    }
  },

  setNewPasswordApproval: function(token){
    var url = '/reset-password/' + token;
    var form = null;
    $('#resetPasswordForm').submit(function(e){
      e.preventDefault();
      if ($('#newPassword').val() !== $('#newPasswordConfirmation').val()){
        alert('Your passwords do not match, please try again.');
      }
      else{
        form = $(this);
        $.ajax({
          url: url,
          type: 'POST',
          data: form.serialize(),
          success: function(){
            form.replaceWith('<span>Your password has been reset. Please proceed to login with your new credentials</span>');
          },
          failure: function(){
            form.replaceWith("<span>We're sorry, but we could not reset your password. \
                                    Either your reset token has expired or there was some other issue. \
                                    Please initiate another password request request, \
                                    and accept our apologies for this inconvenience.");
          }
        });
      }
    });
  },

  scrollToTop: function(){
    var arrow = $('.arrow-trigger');
    var trigger = arrow.offset().top;
    var arrowTrigger = $('.scroll-trigger');
    var body = $(document);
    var on = false;
    var set = false;
    var obj = $('.scroll-wrapper');
    var anchor = $('html, body');

    arrowTrigger.click(function(){
      anchor.animate({
          scrollTop: 0
      }, '500');
    });

    body.scroll(function(){
      if (body.scrollTop() >= trigger) {
        on = true;
      }
      else {
        on = false;
      }
      if (on && !set){
        obj.fadeIn('fast');
        on = false;
        set = true;
      }
      else if (!on && set){
        obj.fadeOut('100');
        set = false;
      }
    });
  },

  clientSignup: function(){
    var slider = $('.signup-slider-2');
    //Client Signup
    $('#client-signup-form > button').click(function(e){
      e.preventDefault();

      sendFormAjaxly('client-signup-form', function(response){
        if(!response.completed){
          //say it response.reason
        document.getElementById('form-client-alert').innerHTML = response.reason;
        }else{
        document.getElementById('form-client-alert').innerHTML = '';
          //continue
          landing.signUpButtonsRemove();
          slider.fadeOut('1000', function(){
            this.remove();
            $('.signup-slider').fadeIn('fast', function(){
              $('.signup-notice').fadeIn('fast');
            });
            $('.signup-notice-wrapper').remove();
          });
        }
      });
    });
  },

  signUpButtonsRemove: function(){
      $('.landing-client-signup').fadeOut('fast', function(){
        this.remove();
      });
      $('.landing-promo-signup').fadeOut('fast', function(){
        this.remove();
      });
  },

  physicianSignup: function(){
    var signupSlider = $('.signup-slider');
    var signupWrapper = $('.signup-notice-wrapper');
    $('.signup-notice-wrapper > .content > form > button').click(function(e){
      e.preventDefault();
      sendFormAjaxly('signup-form', function(response){
        if(!response.completed){
          //say it response.reason
        document.getElementById('form-alert').innerHTML = response.reason;
        }
        else{
          document.getElementById('form-alert').innerHTML = '';
          //continue
          landing.signUpButtonsRemove();
          $('.signup-notice-wrapper').fadeOut('1000', function(){
            signupWrapper.remove();
            signupSlider.fadeIn('fast', function(){
              $('.signup-notice').fadeIn('fast');
            });
          });
        }
      });
    });
  },

  referral: function(){
    //Referral
    $('#referral-form > button').click(function(e){
      e.preventDefault();

      sendFormAjaxly('referral-form', function(response){
      if(!response.completed){
        document.getElementById('form-alert').innerHTML = response.reason;
      }else{
        document.getElementById('form-alert').innerHTML = '';
        //continue
        $('.signup-notice').fadeOut('1000', function(){
          $('.signup-notice-2').fadeIn('fast');
        });
      }
      });
    });
  },

  signup: function(){
	//Signup

    landing.physicianSignup();
    landing.clientSignup();
    landing.referral();
  },

  fancyNav: function(){
    landing.fancyNavTrigger('#key-features', 368);
    landing.fancyNavTrigger('#basic-features', 1243);
    landing.fancyNavTrigger('#advanced-features', 1243);
    landing.fancyNavTrigger('#the-board', 1156);
    landing.fancyNavTrigger('#careers', 470);

    $('.landing-nav > ul > li').click(function(){
      $('.landing-nav > ul > li').removeClass('active');
      $(this).addClass('active');
    });
    landing.navListener();
  },

  fancyNavTrigger: function(selector, span){
    var target = $(selector);
    var trigger = null;
    var active = false;
    var body = $(document);
    body.scroll(function(){
      if(body.scrollTop() >= target.offset().top && ((body.scrollTop() - target.offset().top) <= span)){
        trigger = $(target.attr('data-target'));
        $('.landing-nav > ul > li').removeClass('active');
        trigger.addClass('active');
      }
    });
  },

  navListener: function(){
    var trigger = $('.landing-nav > ul > li');
    var target = null;
    var anchor = $('html, body');
    var position = 0;

    trigger.click(function(){
      trigger = $(this).attr('data-target');
      target = $(trigger);
      position = target.offset().top;

      if(trigger === '#key-features'){
        position -= 105;
      }

      anchor.animate({
          scrollTop: position
      }, '500');
    });

  },

  fancyMore: function(){
    var self, active, target, expand, compress, scrollTo;
    var anchor = $('html, body');

    $('.expandList').click(function(){

      self = $(this);
      active = self.attr('data-active');
      target = self.attr('data-target');
      expand = self.attr('data-expand');
      compress = self.attr('data-compress');
      if(active !== 'false'){
        $(target).slideUp('fast', function(){
          self.attr('data-active',false);
          self.html(expand);
        });
      }
      else {
        $(target).slideDown('fast', function(){
          self.attr('data-active',true);
          self.html(compress);
        });
      }

    });
  },

   //Added to Populate Email on url sign up
   referralEmailPopulate: function(){
        var emailAdd = getUrlParam('email');
        if(emailAdd !== null && emailAdd !== '') {
            $('.landing-promo-signup').trigger("click");
            $('[name="email"]').val(emailAdd);
        }
   }
};

/**
 * Sends an html form to the back-end
 * Action, method and inputs must be corrected
 * settled in the html document
 *
 * @param form_id
 */
function sendFormAjaxly(form_id, done){
	var form = $('#' + form_id);

	$.ajax({
		url : form.attr('action'),
		type : form.attr('method'),
		data: form.serialize()
	}).done(function(response){
		done(response);
	});
}

//Function to get URL parameters
function getUrlParam(name) {
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results===null){
        return null;
    }
    else{
        return results[1] || 0;
    }
}
