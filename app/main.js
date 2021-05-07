//creamos un nuevo archivo PouchDB
let db = new PouchDB('weather');


//llamamos a la API con fetch
  fetch(`https://mars-weather-rems.netlify.app/rems.json`)
  //creamos una promesa para poder llamar a la data
    .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
    .then(data => {
      let caja = document.getElementById("rems");


        let item = `    <div class="upside">
      <!--Title-->
      <div class="header">
        <H2>MARS</H2>
        <ul class="terrestrial_date"><span class="earth_date">${data.weather_report.terrestrial_date}</span></ul>
      </div>
      <!--title end-->

      <!--main temp-->
      <div class="main_temp">
          <ul class="act_temp">
          <span>&#10052;</span>
              <span>${data.weather_report.magnitudes[0].max_temp}ºC</span>
          </ul>
      </div>
      <!--main temp end-->
    </div>

    <div class="downside">
      <div class="first_half">
        <!--sunrise/sunset-->
        <div class="cycle">
          <div class="content">
            <div class="day">
              <h4>Sunrise</h4>
              <ul class="sunrise"><span>${data.weather_report.magnitudes[0].sunrise}</span></ul>
            </div>
            <div class="night">
              <h4>Sunset</h4>
              <ul class="sunset"><span>${data.weather_report.magnitudes[0].sunset}</span></ul>
            </div>
          </div>
        </div>
        <!--sunrise/sunset end-->

        <!--temps-->
        <div class="temp">
          <div class="content">
            <div class="min_temp">
              <h4>Min</h4>
              <ul class="min_temp"><span id="min">${data.weather_report.magnitudes[0].min_temp}ºC</span></ul>
            </div>

            <div class="max_temp">
              <h4>Max</h4>
              <ul class="max_temp"><span id="max">${data.weather_report.magnitudes[0].max_temp}ºC</span></ul>
            </div>
          </div>
        </div>
        <!--temps end-->
      </div>

      <!--magnitudes-->
      <div class="magnitudes">
        <div class="magnitudes_content">
          <div class="sol">
            <h4>Sol</h4>
            <ul><span id="solAct">${data.weather_report.sol}</span></ul>
          </div>
          <!--sol end-->

          <div class="pressure">
            <h4>Pressure</h4>
            <ul><span id="press">${data.weather_report.magnitudes[0].pressure}</span></ul>
          </div>
          <!--pressure end-->

          <div class="gts">
            <h4>GTS</h4>
            <ul class ="gts_box">
              <li><span>${data.weather_report.magnitudes[0].min_gts_temp}º</span></li>
              <li><span id="gts">${data.weather_report.magnitudes[0].max_gts_temp}º</span></li>
            </ul>
          </div>
          <!--gts end-->

        </div>
        <!--magnitudes_content end-->
      </div>
      <!--magnitudes end-->
    </div>`;
        caja.innerHTML += item;

  });

  //crearé un segundo fetch para llamar a las funciones que se hallan en los botones
  fetch(`https://mars-weather-rems.netlify.app/rems.json`)
  //creamos una promesa para poder llamar a los botones
    .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
    .then(data => {
      let buttons = document.getElementById("sections");

      //DESCRIPCIONES Y BOTONES

        let item2 = `    <button class="myBtn">
        <span class="fa fa-info-circle"></span>
      </button>
      <!-- The Modal -->
      <div id="myModal" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
          <span class="close">&times;</span>
          <ul class="info">
            <h4>Sol</h4>
            <span>${data.weather_report.sol_desc[0].en}</span>
          </ul>

          <ul class="info">
            <h4>GTS</h4>
            <span>${data.weather_report.magnitudes[0].gts_temp_desc[0].en}</span>
          </ul>
          <ul class="info">
            <h4>Pressure</h4>
            <span>${data.weather_report.magnitudes[0].pressure_desc[0].en}</span>
          </ul>

          <ul class="info">
            <h4>Temp</h4>
            <span>${data.weather_report.magnitudes[0].temp_desc[0].en}</span>
          </ul>
        </div>
      </div>
      <!--button 1 end-->

      <!-- Button 2 -->
      <button class="myBtn">
        <span class="fa fa-save"></span>
      </button>
      <!-- The Modal -->
      <div id="myModal2" class="modal">
        <!-- Modal content -->
        <div class="modal-content saved">
          <span class="close">&times;</span>
          <p>La data se ha guardado correctamente, revisa la lista para ver tu día.</p>
        </div>
      </div>
      <!--button 2 end-->

      <!-- Button 3 -->
      <button class="myBtn">
        <span class="fa fa-bars"></span>
      </button>
      <!-- The Modal -->
      <div id="myModal3" class="modal">

        <!-- Modal content -->
        <div class="modal-content">
          <div class="modal-header">
          <span class="close">&times;</span>
          <div class="modal-header">
          <span class="list"></span>
          </div>
          </div>
        </div>`;
        buttons.innerHTML += item2;


  /** Función para añadir WEATHER */
  function addWeather(){
    let sol = document.querySelector("#solAct");
    let nextWeather = Math.floor(Math.random() * 3);
    let press = document.querySelector("#press");
    let nextPressure = Math.floor(Math.random() * 6);
    let max = document.querySelector("#max");
    let nextMax = Math.floor(Math.random() * 10000);
    let min = document.querySelector("#min");
    let nextMin = Math.floor(Math.random() * 10000);
    let gts = document.querySelector("#gts");
    let nextGts = Math.floor(Math.random() * 10000);

        // Añadir registro a la BBDD
        let doc = {
            "_id": `sol${nextWeather}`,
            "sol": sol.innerHTML,
            "_id": `press${nextPressure}`,
            "press": press.innerHTML,
            "_id": `max${nextMax}`,
            "max": max.innerHTML,
            "_id": `min${nextMin}`,
            "min": min.innerHTML,
            "_id": `gts${nextGts}`,
            "gts": gts.innerHTML,
          };
        db.put(doc);


}

    /** Función para pintar la lista de weathers */
    function renderWeather(){
      let lista = document.querySelector(".list");

      lista.innerHTML = "";
      //Se llama a toda la data guardada en el PouchDB
      db.allDocs({include_docs: true}, function(err, docs) {
          if (err) {
            return console.log(err);
          } else {
              users = docs.rows;
              users.forEach(element => {
                  let user = `
                              <article class="list_doc">
                              <span class ="flake">&#10052;</span>
                                  <div>${element.doc._id}</div>
                                  <div>${element.doc.sol}</div>
                                  <div>${element.doc.press}</div>
                                  <div>${element.doc.max}</div>
                                  <div>${element.doc.min}</div>
                                  <div>${element.doc.gts}</div>
                                  <div class="erase"><i class="fa fa-eraser"></i></div>

                              </article>`;
                  lista.innerHTML += user;
              });

              //se declara la clase borrar
              //erase button
                let erase = document.getElementsByClassName("erase");

                [].forEach.call(erase, function (el) {
                    el.onclick = function(){
                        deleteItem(el);
                    };

                });

                function deleteItem(btnDelete) {
                    //console.log(btnDelete.parentElement.children[1].innerText);
                    let elemId = btnDelete.parentElement.children[1].innerText;
                    let rev;

                    db.get(elemId, function(err, doc) {
                        if (err) {
                           return console.log(err);
                        } else {
                            rev = doc._rev;

                            //Borrar el item
                            db.remove(elemId, rev, function(err) {
                                if (err) {
                                   return console.log(err);
                                } else {
                                   console.log("Document deleted successfully");
                                   renderWeather();
                                }
                            });
                        }
                     });
                }
            }
      });
  }




//creamos la función que se encarga de borrar a la data
// erase.onclick = function(){
//   db.remove('_id', 'sol', 'press', 'max', 'min', 'gts', function(err) {
//     if (err) {
//        return console.log(err);
//     } else {
//        console.log("Document deleted successfully");
//     }
//   });
// };

// declaramos el modal
let modal = document.getElementsByClassName('modal');

// declaramos el botón que abre el modal
let btn = document.getElementsByClassName("myBtn");


// declaramos el span que cerrará a la ventana
let span = document.getElementsByClassName("close");

// cuando el usuario de click al ícono se abrirá el modal
//botón_1
btn[0].onclick = function() {
    modal[0].style.display = "block";
}
//botón_2
btn[1].onclick = function() {
    modal[1].style.display = "block";
    addWeather();
}
//botón_3
btn[2].onclick = function() {
  modal[2].style.display = "block";
  renderWeather();
}

// cuando el usuario de click a la x se cerrará el modal
span[0].onclick = function() {
    modal[0].style.display = "none";
}

span[1].onclick = function() {
    modal[1].style.display = "none";
}
span[2].onclick = function() {
  modal[2].style.display = "none";
}
});


