const albums = JSON.parse(bestAlbums);
 
function provideElements() {
  let selectYear = document.getElementById("selectYear");
  let selectCountry = document.getElementById("selectCountry");
  let selectName = document.getElementById("selectName");
  let selectAlbumName = document.getElementById("selectAlbumName");
  let selectGenreName = document.getElementById("selectGenreName");
 
  
  let insertElements = function(select, value, text) {
      let option = document.createElement("option");
      option.value = value;
      option.text = text;
      select.add(option);
  };

  insertElements(selectYear, "All", "All");
  for (let album of albums) {
      insertElements(selectYear, album.year, album.year);
  }

  let countries = [];
  countries.push("All");
  for (let album of albums) {
    if (album.nationality != null) {
      if (!countries.includes(album.nationality)) {
        countries.push(album.nationality);
      }
    }
  }
  for (let country of countries) {
      insertElements(selectCountry, country, country);
  }

  let names = [];
  names.push("All");
  for (let album of albums) {
    if (album.artist != null) {
      if (!names.includes(album.artist)) {
        names.push(album.artist);
      }
    }
  }
  for (let name of names) {
      insertElements(selectName, name, name);
  }

  let albumnames = [];
  albumnames.push("All");
  for (let album of albums) {
    if (album.album != null) {
      if (!albumnames.includes(album.album)) {
        albumnames.push(album.album);
      }
    }
  }
  for (let albumname of albumnames) {
      insertElements(selectAlbumName, albumname, albumname);
  }
  let genrenames = [];
  genrenames.push("All");
  for (let album of albums) {
    if (album.genre != null) {
      if (!genrenames.includes(album.genre)) {
        genrenames.push(album.genre);
      }
    }
  }
  for (let genrename of genrenames) {
      insertElements(selectGenreName, genrename, genrename);
  }

}

function filterThings() {
  let selectedYear = document.getElementById("selectYear").value;
  let selectedCountry = document.getElementById("selectCountry").value;
  let selectedName = document.getElementById("selectName").value;
  let selectedAlbumName = document.getElementById("selectAlbumName").value;
  let selectedGenreName = document.getElementById("selectGenreName").value;
  

  let data = albums;
  if (selectedYear != "All") {
    let year = parseInt(selectedYear);
    data = data.filter(a => a.year == year);
  }
  if (selectedCountry != "All") {
    data = data.filter(a => a.nationality == selectedCountry);
  }
  if (selectedName != "All") {
    data = data.filter(a => a.artist == selectedName);
  }
  if (selectedAlbumName != "All") {
    data = data.filter(a => a.album == selectedAlbumName);
  }
  if (selectedGenreName != "All") {
    data = data.filter((a => a.genre == selectedGenreName));
  }
 
  return data;
}

function unfilterThings(albumsList) {
  let table = document.getElementById("hitsTable");

  let rowCount = table.rows.length;
  while(--rowCount) {
    table.deleteRow(rowCount);
  }

  let addRow = function(element) {
    let tr = document.createElement("tr");
    let addCell = function(text) {
      let td = document.createElement("td");
      let txt = document.createTextNode(text);
      td.appendChild(txt);
      tr.appendChild(td);
    };
	let addCellImage = function(text) {
      let td = document.createElement("td");
	  let img = document.createElement("IMG");
	  img.setAttribute("src", text);
	  img.setAttribute("class", "albumcover");
      td.appendChild(img);
      tr.appendChild(td);
    };
	let addCellLink = function(text,utext) {
      let td = document.createElement("td");
      let al = document.createElement("a");
	  let txt = document.createTextNode(text);
	  al.setAttribute("href", utext);
	  al.setAttribute("target", "_blank");
	  al.appendChild(txt);
      td.appendChild(al);
      tr.appendChild(td);
    };
	
    addCell(element.year);
    addCell(element.artist);
    addCell(element.nationality);
    addCellLink(element.album,element.url);
    addCell(element.genre);
    addCellImage(element.cover);
    
    table.appendChild(tr);
  };

  albumsList.forEach(element => addRow(element));
}

window.onload = function() {
  provideElements();

  let selectYear = document.getElementById("selectYear");
  let selectCountry = document.getElementById("selectCountry");
  let selectName = document.getElementById("selectName");
  let selectAlbumName = document.getElementById("selectAlbumName");
  let selectGenreName = document.getElementById("selectGenreName");
  

  selectYear.onchange = function() {
    let newAlbums = filterThings(albums);
    unfilterThings(newAlbums);
  };
  selectCountry.onchange = function() {
    let newAlbums = filterThings(albums);
    unfilterThings(newAlbums);
  };
  selectName.onchange = function() {
    let newAlbums = filterThings(albums);
    unfilterThings(newAlbums);
  };
  selectAlbumName.onchange = function() {
    let newAlbums = filterThings(albums);
    unfilterThings(newAlbums);
  };
  selectGenreName.onchange = function() {
    let newAlbums = filterThings(albums);
    unfilterThings(newAlbums);
  };
 
  unfilterThings(albums);


};