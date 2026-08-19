/* Holistic Physio concept - interactions
   Plain script (no modules) so it also runs from file:// previews. */
(function () {
  "use strict";

  var BOOK_URL = "https://clientportal.zandahealth.com/clientportal/holisticphysioacup";

  /* Escape hatch for screenshot tools and previews: ?noanim renders the
     page fully revealed with instant scrolling. */
  if (window.location.search.indexOf("noanim") !== -1) {
    document.documentElement.classList.add("no-anim");
  }

  /* ---------- Nav: solid background after leaving the hero top ---------- */
  var nav = document.getElementById("nav");
  var sentinel = document.getElementById("hero-sentinel");

  if (nav && sentinel && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      nav.classList.toggle("is-scrolled", !entries[0].isIntersecting);
    }).observe(sentinel);
  } else if (nav) {
    nav.classList.add("is-scrolled");
  }

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Nav dropdown (Issues menu) ---------- */
  var navDropdowns = document.querySelectorAll(".nav-dropdown");
  var DROPDOWN_CLOSE_DELAY = 350; // ms grace period so crossing the gap to the menu doesn't close it
  navDropdowns.forEach(function (dropdown) {
    var trigger = dropdown.querySelector(".nav-dropdown-trigger");
    if (!trigger) return;
    var closeTimer = null;

    function openDropdown() {
      clearTimeout(closeTimer);
      dropdown.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
    }
    function scheduleClose() {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(function () {
        dropdown.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
      }, DROPDOWN_CLOSE_DELAY);
    }

    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      if (dropdown.classList.contains("is-open")) {
        clearTimeout(closeTimer);
        dropdown.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
      } else {
        openDropdown();
      }
    });

    if (window.matchMedia("(hover: hover)").matches) {
      dropdown.addEventListener("mouseenter", openDropdown);
      dropdown.addEventListener("mouseleave", scheduleClose);
    }
  });
  document.addEventListener("click", function (e) {
    navDropdowns.forEach(function (dropdown) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("is-open");
        var trigger = dropdown.querySelector(".nav-dropdown-trigger");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      }
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      navDropdowns.forEach(function (dropdown) {
        dropdown.classList.remove("is-open");
        var trigger = dropdown.querySelector(".nav-dropdown-trigger");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      });
    }
  });

  /* ---------- Scroll reveals ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Generic rail/carousel setup ---------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setupRail(rail, prevBtn, nextBtn, cardSelector, autoplayMs, loop) {
    if (!rail || !prevBtn || !nextBtn) return;

    var originalCards, singleWidth;

    if (loop) {
      originalCards = Array.prototype.slice.call(rail.querySelectorAll(cardSelector));
      originalCards.forEach(function (card) {
        var clone = card.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        clone.removeAttribute("data-reveal");
        rail.appendChild(clone);
      });
      singleWidth = rail.scrollWidth / 2;
    }

    var step = function () {
      var card = rail.querySelector(cardSelector);
      return card ? card.getBoundingClientRect().width + 20 : 440;
    };

    var normalizeLoop = function () {
      if (!loop) return;
      if (rail.scrollLeft >= singleWidth - 2) {
        rail.scrollLeft -= singleWidth;
      } else if (rail.scrollLeft <= 2) {
        rail.scrollLeft += singleWidth;
      }
    };

    prevBtn.addEventListener("click", function () {
      rail.scrollBy({ left: -step(), behavior: "smooth" });
      if (loop) setTimeout(normalizeLoop, 450);
    });
    nextBtn.addEventListener("click", function () {
      rail.scrollBy({ left: step(), behavior: "smooth" });
      if (loop) setTimeout(normalizeLoop, 450);
    });
    var updateRailButtons = function () {
      if (loop) {
        prevBtn.disabled = false;
        nextBtn.disabled = false;
        return;
      }
      var max = rail.scrollWidth - rail.clientWidth - 2;
      prevBtn.disabled = rail.scrollLeft <= 2;
      nextBtn.disabled = rail.scrollLeft >= max;
    };
    rail.addEventListener("scroll", updateRailButtons, { passive: true });
    window.addEventListener("resize", updateRailButtons);
    updateRailButtons();

    if (!autoplayMs) return;

    var autoplayTimer = null;

    var stopAutoplay = function () {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    };

    var startAutoplay = function () {
      if (reduceMotion) return;
      stopAutoplay();
      autoplayTimer = setInterval(function () {
        if (loop) {
          rail.scrollBy({ left: step(), behavior: "smooth" });
          setTimeout(normalizeLoop, 450);
          return;
        }
        var max = rail.scrollWidth - rail.clientWidth - 2;
        if (rail.scrollLeft >= max) {
          rail.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          rail.scrollBy({ left: step(), behavior: "smooth" });
        }
      }, autoplayMs);
    };

    rail.addEventListener("mouseenter", stopAutoplay);
    rail.addEventListener("mouseleave", startAutoplay);
    rail.addEventListener("touchstart", stopAutoplay, { passive: true });
    prevBtn.addEventListener("click", stopAutoplay);
    nextBtn.addEventListener("click", stopAutoplay);

    startAutoplay();
  }

  setupRail(
    document.getElementById("care-rail"),
    document.getElementById("rail-prev"),
    document.getElementById("rail-next"),
    ".care-card",
    4000,
    true
  );

  setupRail(
    document.getElementById("testimonial-rail"),
    document.getElementById("testimonial-prev"),
    document.getElementById("testimonial-next"),
    ".testimonial-card",
    5000,
    true
  );

  /* ---------- Conditions widget ---------- */
  var THERAPY_LINKS = {
    "Physiotherapy": "physiotherapy.html",
    "Acupuncture": "acupuncture.html",
    "Chinese Herbal Medicine": "chinese-herbal-medicine.html",
    "Clinical Pilates": "clinical-pilates.html",
    "Fertility Acupuncture": "fertility-acupuncture.html"
  };

  var CONDITIONS = [
    {
      name: "Chronic and acute pain",
      desc: "Pain that has settled in, or arrived suddenly, rarely has a single cause. We combine hands-on treatment with acupuncture and movement to calm it down and keep it away.",
      examples: ["Back pain", "Neck pain", "Frozen shoulder", "Sciatica", "Fibromyalgia"],
      therapies: ["Physiotherapy", "Acupuncture", "Clinical Pilates"],
      link: "pain.html"
    },
    {
      name: "Sports injuries",
      desc: "From weekend niggles to season-ending tears, the goal is the same: heal properly, rebuild strength, and return to sport without the injury coming back.",
      examples: ["Ankle sprains", "Knee injuries", "Groin strain", "Muscle and ligament tears"],
      therapies: ["Physiotherapy", "Clinical Pilates", "Acupuncture"],
      link: "sports-injuries.html"
    },
    {
      name: "Work injuries",
      desc: "Repetitive strain and desk-bound postures build up quietly. We treat the injury and correct the pattern that caused it, with WorkCover claims supported.",
      examples: ["Tennis elbow", "Carpal tunnel", "Shoulder blade pain", "Thumb pain"],
      therapies: ["Physiotherapy", "Acupuncture"],
      link: "work-injuries.html"
    },
    {
      name: "Migraines and headaches",
      desc: "Recurring headaches often trace back to the neck, jaw, stress load or internal imbalance. Treating those sources brings relief that painkillers cannot.",
      examples: ["Migraines", "Tension headaches", "Dizziness", "Vertigo"],
      therapies: ["Acupuncture", "Physiotherapy", "Chinese Herbal Medicine"],
      link: "migraines-and-headaches.html"
    },
    {
      name: "Stress",
      desc: "A little stress can keep you motivated, but ongoing stress drains your energy, affects your mood and leads to long-term health issues. The right care brings your body and mind back into balance.",
      examples: ["Tight shoulders and jaw clenching", "Poor sleep", "Low energy", "Digestive upset"],
      therapies: ["Acupuncture", "Physiotherapy", "Chinese Herbal Medicine", "Clinical Pilates"],
      link: "stress.html"
    },
    {
      name: "Anxiety and depression",
      desc: "Anxiety and depression are not just in the mind, they show up in the body: tight muscles, disrupted sleep, low energy. We offer calming, evidence-informed support alongside any care you already receive.",
      examples: ["Panic attacks", "Poor sleep", "Physical tension", "Low mood"],
      therapies: ["Acupuncture", "Chinese Herbal Medicine"],
      link: "anxiety-and-depression.html"
    },
    {
      name: "Chronic fatigue",
      desc: "Tired no matter how much you rest? We look at the whole picture, digestion, sleep, stress and constitution, and rebuild your energy from the foundations.",
      examples: ["Constant tiredness", "No energy through the day", "Post-viral fatigue"],
      therapies: ["Chinese Herbal Medicine", "Acupuncture"],
      link: "fatigue.html"
    },
    {
      name: "Women's health",
      desc: "Care through every stage: painful periods, hormonal swings, pregnancy, post-natal recovery and menopause, treated gently and holistically.",
      examples: ["PMT", "Period pain", "Menopause", "Pregnancy care", "Post-natal care"],
      therapies: ["Acupuncture", "Chinese Herbal Medicine", "Clinical Pilates"],
      link: "womens-health.html"
    },
    {
      name: "Digestive issues",
      desc: "Digestion is central to how you feel every day. Herbal formulas and acupuncture work on the gut directly rather than just masking the discomfort.",
      examples: ["Irritable bowel syndrome", "Bloating", "Stomach pain"],
      therapies: ["Chinese Herbal Medicine", "Acupuncture"],
      link: "digestive-issues.html"
    },
    {
      name: "Fertility",
      desc: "Support for natural conception and alongside IVF: balancing hormones, improving circulation and lowering stress to give you the best possible chance.",
      examples: ["Natural conception", "IVF support", "Hormonal balance"],
      therapies: ["Fertility Acupuncture", "Chinese Herbal Medicine"],
      link: "fertility.html"
    }
  ];

  var pillsWrap = document.getElementById("condition-pills");
  var cpTitle = document.getElementById("cp-title");
  var cpDesc = document.getElementById("cp-desc");
  var cpExamples = document.getElementById("cp-examples");
  var cpTherapies = document.getElementById("cp-therapies");
  var cpReadMore = document.getElementById("cp-readmore");

  if (pillsWrap && cpTitle) {
    var renderCondition = function (index) {
      var c = CONDITIONS[index];
      cpTitle.textContent = c.name;
      cpDesc.textContent = c.desc;
      cpExamples.innerHTML = "";
      c.examples.forEach(function (ex) {
        var li = document.createElement("li");
        li.textContent = ex;
        cpExamples.appendChild(li);
      });
      cpTherapies.innerHTML = "";
      c.therapies.forEach(function (t) {
        var li = document.createElement("li");
        var href = THERAPY_LINKS[t];
        if (href) {
          var a = document.createElement("a");
          a.href = href;
          a.textContent = t;
          li.appendChild(a);
        } else {
          li.textContent = t;
        }
        cpTherapies.appendChild(li);
      });
      if (cpReadMore) {
        cpReadMore.href = c.link;
      }
      pillsWrap.querySelectorAll(".pill").forEach(function (btn, i) {
        btn.setAttribute("aria-pressed", i === index ? "true" : "false");
      });
    };

    CONDITIONS.forEach(function (c, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "pill";
      btn.textContent = c.name;
      btn.setAttribute("aria-pressed", "false");
      btn.addEventListener("click", function () {
        renderCondition(i);
      });
      pillsWrap.appendChild(btn);
    });

    renderCondition(0);
  }

  /* ---------- Locations widget ---------- */
  var SUBURBS = [
    ["West End", 4, "west-end.html"], ["Dutton Park", 4, "dutton-park.html"], ["South Brisbane", 5, "south-brisbane.html"],
    ["Fairfield", 6, "fairfield.html"], ["Annerley", 6, "annerley.html"], ["Woolloongabba", 7, "woolloongabba.html"],
    ["East Brisbane", 8, "east-brisbane.html"], ["Milton", 8, "milton.html"], ["Kangaroo Point", 9, "kangaroo-point.html"],
    ["Yeronga", 9, "yeronga.html"], ["Spring Hill", 9, "spring-hill.html"], ["St Lucia", 10, "st-lucia.html"],
    ["Toowong", 10, "toowong.html"], ["Coorparoo", 10, "coorparoo.html"], ["Stones Corner", 10, "stones-corner.html"],
    ["Paddington", 10, "paddington.html"], ["Fortitude Valley", 10, "fortitude-valley.html"], ["Greenslopes", 11, "greenslopes.html"],
    ["Tarragindi", 11, "tarragindi.html"], ["Moorooka", 11, "moorooka.html"], ["New Farm", 12, "new-farm.html"],
    ["Holland Park", 12, "holland-park.html"], ["Salisbury", 13, "salisbury.html"], ["Sherwood", 13, "sherwood.html"],
    ["Indooroopilly", 13, "indooroopilly.html"], ["Graceville", 14, "graceville.html"], ["Corinda", 15, "corinda.html"]
  ];

  var suburbWrap = document.getElementById("suburb-pills");
  var distValue = document.getElementById("distance-value");
  var distNote = document.getElementById("distance-note");

  if (suburbWrap && distValue) {
    SUBURBS.forEach(function (entry) {
      var link = document.createElement("a");
      link.href = entry[2];
      link.className = "pill";
      link.textContent = entry[0];
      link.setAttribute("aria-pressed", "false");
      link.addEventListener("click", function (e) {
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return;
        e.preventDefault();
        suburbWrap.querySelectorAll(".pill").forEach(function (b) {
          b.setAttribute("aria-pressed", b === link ? "true" : "false");
        });
        distValue.innerHTML =
          "~" + entry[1] + ' <span class="accent">min drive</span>';
        distNote.textContent =
          "Approximate drive from " + entry[0] + " to the clinic, outside peak times.";
      });
      suburbWrap.appendChild(link);
    });
  }

  /* ---------- FAQ: close others when one opens ---------- */
  var faqItems = document.querySelectorAll(".faq-list details");
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  /* ---------- Lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    var lightboxImg = document.getElementById("lightbox-img");
    var lightboxLink = document.getElementById("lightbox-link");
    var lightboxTriggers = document.querySelectorAll("[data-lightbox-image]");

    function openLightbox(trigger) {
      lightboxImg.src = trigger.getAttribute("data-lightbox-image");
      lightboxImg.alt = trigger.getAttribute("data-lightbox-alt") || "";
      if (lightboxLink) {
        lightboxLink.href = trigger.getAttribute("data-lightbox-href") || "#";
      }
      lightbox.classList.add("is-active");
      lightbox.setAttribute("aria-hidden", "false");
    }

    function closeLightbox() {
      lightbox.classList.remove("is-active");
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImg.src = "";
    }

    lightboxTriggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        openLightbox(trigger);
      });
    });

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target.closest(".lightbox-close")) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
  }

  /* ---------- Obfuscated email buttons (no href, so no hover preview or
     right-click "copy link" menu; address is only assembled on click) ---------- */
  var emailButtons = document.querySelectorAll(".js-email");
  emailButtons.forEach(function (el) {
    el.addEventListener("click", function () {
      var user = el.getAttribute("data-user");
      var domain = el.getAttribute("data-domain");
      if (user && domain) {
        window.location.href = "mailto:" + user + "@" + domain;
      }
    });
  });

  /* ---------- Contact form submission ---------- */
  var contactForm = document.getElementById("contact-form-element");
  if (contactForm) {
    var statusDiv = document.createElement("div");
    statusDiv.id = "form-feedback";
    statusDiv.className = "form-feedback";
    contactForm.appendChild(statusDiv);

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var submitBtn = contactForm.querySelector("button[type='submit']");
      statusDiv.textContent = "Sending...";
      statusDiv.className = "form-feedback sending";
      submitBtn.disabled = true;

      var formData = new FormData(contactForm);
      var data = {
        name: formData.get("name"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        message: formData.get("message")
      };

      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .then(function (response) {
        if (response.ok) {
          statusDiv.innerHTML = "<strong>✓ Message sent!</strong> Thank you. We'll get back to you shortly.";
          statusDiv.className = "form-feedback success";
          contactForm.reset();
        } else {
          return response.json().then(function (data) {
            console.error("API error:", data);
            statusDiv.innerHTML = "<strong>Error:</strong> " + (data.error || "Failed to send message. Please try again or call 07 3844 8202.");
            statusDiv.className = "form-feedback error";
          }).catch(function () {
            statusDiv.innerHTML = "<strong>Error sending message.</strong> Please try again or call 07 3844 8202.";
            statusDiv.className = "form-feedback error";
          });
        }
      })
      .catch(function (error) {
        console.error("Form submission error:", error);
        statusDiv.innerHTML = "<strong>Error sending message.</strong> Please try again or call 07 3844 8202.";
        statusDiv.className = "form-feedback error";
      })
      .finally(function () {
        submitBtn.disabled = false;
      });
    });
  }

  /* ---------- Cookie consent popup ---------- */
  var cookieConsentKey = "holistic-physio-cookie-consent";
  if (!localStorage.getItem(cookieConsentKey)) {
    var cookiePopup = document.createElement("div");
    cookiePopup.className = "cookie-popup";
    cookiePopup.innerHTML = '<p>We use Google Analytics to understand how you use our site and improve your experience.</p><button class="cookie-accept" aria-label="Accept cookies">Got it</button>';

    var closeButton = cookiePopup.querySelector(".cookie-accept");
    closeButton.addEventListener("click", function () {
      localStorage.setItem(cookieConsentKey, "true");
      cookiePopup.classList.add("cookie-hidden");
      setTimeout(function () {
        cookiePopup.remove();
      }, 300);
    });

    document.body.appendChild(cookiePopup);

    setTimeout(function () {
      if (!localStorage.getItem(cookieConsentKey) && cookiePopup.parentElement) {
        localStorage.setItem(cookieConsentKey, "true");
        cookiePopup.classList.add("cookie-hidden");
        setTimeout(function () {
          if (cookiePopup.parentElement) cookiePopup.remove();
        }, 300);
      }
    }, 5000);
  }
})();
