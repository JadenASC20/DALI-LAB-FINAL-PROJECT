
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const card = document.querySelectorAll('.card');


document.querySelectorAll(".card__inner").forEach(elem => elem.addEventListener("click",
 () => {
   console.log("I AM CLCIKED!!!!!!");
   elem.classList.toggle('is-flipped');
  }));

const button = document.getElementById("reload_button");
button.addEventListener("click", function() {
  console.log("I AM CLCIKED!!!!!!");
});

var modal = document.getElementById("tutmodal");

// Get the button that opens the modal
var btn = document.getElementById("tutBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function get_race(object) {
  const keys = Object.keys(object); // convert object keys to array
  const startIndex = 4;
  race_array = [];
  
  for (let i = startIndex; i < 12; i++) {
    const key = keys[i];
    const value = object[key];
    if (value !== "") {
      race_array.push(value);
    }
  
  }

  return race_array.join(', ')
}

function get_major_mod_min(object) {
  
  degree = object.major
  if (degree.includes(",") == true) {
    major_array = degree.split(', ');

    major = object.major;
    minor = object.minor;
    modification = object.modification;

    if (major_array.length == 2) {
      major = major_array[0];
      modification = major_array[1];
    }
    
    else if (major_array.length == 3) {
      major = major_array[0];
      modification = major_array[1];
      minor = major_array[2];
    }

    else {
      major = object.major;
      minor = object.minor;
      modification = object.modification;
    }
    
  } 
    
  else {
    major = object.major;
    minor = object.minor;
    modification = object.modification;
  }

  if (minor == null || minor == "") {
    minor = "N/A";
  }

  if (modification == null || modification == "") {
    modification = "N/A"
  }
  
  return [major, modification, minor];
}

function get_birthday(object) {
  birthday = object.birthday;
  mm_dd_yy = birthday.split("/");
  month = mm_dd_yy[0];
  
  day = mm_dd_yy[1];
  year = mm_dd_yy[2];

   if (month.length == 1) {
    month = "0" + month 
  }

  if (day.length == 1) {
    day = "0" + day 
  }
  
  return [month, day, year];
}

function get_role_and_home(object) {

  get_role = [];
  get_home = [];
  
  get_role.push(object.role);
  get_home.push(object.home);

  role_home = get_role.concat(get_home);
  combine_role_home = role_home.join(" | ");

  return combine_role_home
}

function check_phoneType(object) {
  object_phone_type = object.phoneType
  if (object_phone_type == "iOS") {
    phone_type = "media/apple_logo.png"
  }

  else if (object_phone_type == "Android") {
    phone_type = "media/android_logo.png"
  }

  else {
    phone_type = "media/other_phone_logo.png"
  }
  
}

function get_favorite_color(object) {
  get_color = object.favoriteColor;
  get_color = get_color.toLowerCase()
  favorite_color = get_color

  if (get_color.includes(" ") == true) {
    // console.log("TRUE")
    //combine them into one string and make them lowercase
    temp_get = get_color.split(" ");    
    favorite_color = temp_get.join('')
  }

  else if (favorite_color.includes(",") == true) {
    //take the first value before the comma and return it
    temp_get = get_color.split(",");
    console.log('TEST');
    favorite_color = temp_get[0];
  }

  else if (get_color.includes("-") == true) {
    //removes the dash, combines them, and then returns it
    temp_get = get_color.split("-");
    favorite_color = temp_get.join('');
  }

  //there will be a fallback color in case the css wont take the user input color
  return favorite_color
}



async function loadProfiles() {
  const profile_data = await fetch("https://raw.githubusercontent.com/dali-lab/dali-challenges/main/data/DALI_Data.json");
  const profile_values = await profile_data.json();

  for(let i = 0; i < 7; i++) {
    
    rand_card_num = getRandomInt(0, profile_values.length)
    rand_card = profile_values[rand_card_num];

    name = rand_card.name;
    
    gradyear = rand_card.year;

    profile_pic = rand_card.picture;
    gender = rand_card.gender;
    race = get_race(rand_card);
    
    maj_mod_min = get_major_mod_min(rand_card);
    console.log(maj_mod_min)
    major = maj_mod_min[0];
    modification = maj_mod_min[1];
    minor = maj_mod_min[2];

    birthday_m_d_y = get_birthday(rand_card);
    month = birthday_m_d_y[0];
    day = birthday_m_d_y[1];
    year = birthday_m_d_y[2];
    
    role_and_home = get_role_and_home(rand_card)
    quote = rand_card.quote;
    favoriteShoe = rand_card.favoriteShoe;
    favoriteArtist = rand_card.favoriteArtist;
    phoneType = check_phoneType(rand_card);
    favoriteColor = get_favorite_color(rand_card);
    race_gender = race + ", " + gender
    
    random_number_footer = (rand_card_num + 1) + `/${profile_values.length}`

    //front of the card

    document.getElementById(`card${i}_phonetypeimg`).src = `${phone_type}`; // sets phone type
    document.getElementById(`card${i}_mm`).innerHTML = `${month}` //sets month
    document.getElementById(`card${i}_dd`).innerHTML = `${day}` //sets day
    document.getElementById(`card${i}_yy`).innerHTML = `${year}` //sets year
    
    document.getElementById(`card${i}_favcol`).style.color = `${favoriteColor}`;
    document.getElementById(`card${i}_favcol`).style.background = `${favoriteColor}`;
    
    document.getElementById(`card${i}_year`).innerHTML = `${gradyear}`//sets gradyear
    document.getElementById(`card${i}_pfp`).src = `${profile_pic}`//sets pfp
    document.getElementById(`card${i}_name`).innerHTML = `${name}`//sets name
    document.getElementById(`card${i}_role_home`).innerHTML = `${role_and_home}` //sets role and home
    document.getElementById(`card${i}_major`).innerHTML = `${major}`//sets name
    document.getElementById(`card${i}_quote`).innerHTML = `${quote}`//sets name
    
    //back of the card
    document.getElementById(`card${i}_phonetypeimg_back`).src = `${phone_type}`;
    document.getElementById(`card${i}_year_reversed`).innerHTML = `${gradyear}`
    document.getElementById(`card${i}_quote_back`).innerHTML = `${quote}`;
    document.getElementById(`card${i}_swiftness`).innerHTML = `${favoriteShoe}`;
    document.getElementById(`card${i}_amplifier`).innerHTML = `${favoriteArtist}`;
    document.getElementById(`card${i}_role_home_back`).innerHTML = `${role_and_home}`
    document.getElementById(`card${i}_footer`).innerHTML = `${random_number_footer}`
    document.getElementById(`card${i}_power`).innerHTML = `${major}`;
    document.getElementById(`card${i}_race_gender`).innerHTML = `${race_gender}`;
    document.getElementById(`card${i}_skill`).innerHTML = `${minor}`;
    document.getElementById(`card${i}_buffer`).innerHTML = `${modification}`;

    //phew im tired of coding, lets get some pizza!!!!
  }
  
  // console.log(profile_values); //just checking to see if if works
};

loadProfiles();

