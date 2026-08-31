(function(){
  var burger = document.getElementById('burger');
  var nav = document.getElementById('navlinks');

  function hideCloudsIfNarrow(){
    var narrow = window.innerWidth <= 900;
    document.querySelectorAll('.cloud-line').forEach(function(c){
      c.style.display = narrow ? 'none' : '';
    });
  }
  hideCloudsIfNarrow();
  window.addEventListener('resize', hideCloudsIfNarrow);

  burger.addEventListener('click', function(){
    var open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.innerHTML = open ? '&times;' : '&#9776;';
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.innerHTML = '&#9776;';
    });
  });

  function wireExpandable(selector){
    document.querySelectorAll(selector).forEach(function(card){
      function toggle(){
        var isOpen = card.classList.toggle('open');
        card.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
      card.addEventListener('click', toggle);
      card.addEventListener('keydown', function(e){
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      });
    });
  }
  wireExpandable('.svc');
  wireExpandable('.proc');

  var form = document.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = document.getElementById('f-name').value.trim();
      var business = document.getElementById('f-business').value.trim();
      var phone = document.getElementById('f-phone').value.trim();
      var need = document.getElementById('f-need').value;
      var budget = document.getElementById('f-budget').value;
      var message = document.getElementById('f-message').value.trim();

      if (!name || !phone) {
        alert('Please fill in your name and phone number.');
        return;
      }

      var lines = [
        'Hi, I would like a free quote for my website.',
        'Name: ' + name,
        business ? 'Business: ' + business : null,
        'Phone: ' + phone,
        need ? 'Requirement: ' + need : null,
        budget ? 'Budget: ' + budget : null,
        message ? 'Message: ' + message : null
      ].filter(Boolean).join('\n');

      var subject = 'Free Quote Request - ' + name;
      var url = 'mailto:sk.cloudconsultant@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines);
      window.location.href = url;
    });
  }

  // 3D tilt interaction
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) {
    document.querySelectorAll('[data-tilt]').forEach(function(el){
      el.addEventListener('mousemove', function(e){
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = 'rotateY(' + (x * 9).toFixed(2) + 'deg) rotateX(' + (-y * 9).toFixed(2) + 'deg) translateY(-4px)';
      });
      el.addEventListener('mouseleave', function(){
        el.style.transform = '';
      });
    });
  }
})();
