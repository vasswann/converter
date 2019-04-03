/**==================ConverterController=================* */
const converterController = (function() {
  const Converteritem = function(
    id,
    type,
    leftInput,
    rightInput,
    leftValue,
    rightValue,
    time
  ) {
    this.id = id;
    this.tYpe = type;
    this.leftInput = leftInput;
    this.rightInput = rightInput;
    this.leftValue = leftValue;
    this.rightValue = rightValue;
    this.time = time;
  };

  const typeArray = ["Temperature", "Area", "Length", "Mass", "Speed", "Time"];
  //this variabels for the secret code
  const pressed = [];
  const jokes = "funjoke";
  const secretCode = "unicorn";

  class LocalStore {
    static getFromLocalStore() {
      let savedData;
      if (localStorage.getItem("savedData") === null) {
        savedData = [];
      } else {
        savedData = JSON.parse(localStorage.getItem("savedData"));
      }
      return savedData;
    }

    static addToLocalStore(list) {
      const dataInput = LocalStore.getFromLocalStore();
      dataInput.push(list);
      localStorage.setItem("savedData", JSON.stringify(dataInput));
    }

    static removeFromLocalStore(target) {
      const dataInput = LocalStore.getFromLocalStore();
      target = parseInt(target);
      dataInput.forEach(function(list, index) {
        if (list.id === target) {
          dataInput.splice(index, 1);
        }
      });
      localStorage.setItem("savedData", JSON.stringify(dataInput));
    }
  }

  const chuckJokes = function() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://api.icndb.com/jokes/random/2", true);
    xhr.onload = function() {
      if (this.status === 200) {
        const response = JSON.parse(this.responseText);

        let output = "";

        if (response.type === "success") {
          response.value.forEach(function(joke) {
            output += `<li>${joke.joke}</li>`;
          });
        } else {
          output += "<li>Something went wrong</li>";
        }

        document.querySelector(".jokes").innerHTML = output;
      }
    };
    xhr.send();
  };

  return {
    addDataToItemList: function() {
      return Converteritem;
    },

    store: function() {
      return LocalStore;
    },

    addTypeArray: function() {
      return typeArray;
    },

    addArrays: function() {
      return {
        temperatureArray: ["Celsius", "Fahrenheit", "Kelvin"],
        lengthArray: [
          "Kilometre",
          "Metre",
          "Centimetre",
          // "Millimetre",
          "Mile",
          "Yard",
          "Foot",
          "Inch"
        ],
        areaArray: [
          "Square metre",
          "Square kilometre",
          // "Square Mile",
          // "Square yard",
          // "Square foot",
          // "Square inch",
          "Hectare",
          "Acre"
        ],
        massArray: [
          "Tonne",
          "Kilogram",
          "Gram",
          // "Milligram",
          // "Microgram",
          // "Imperial ton",
          // "US ton",
          "Stone",
          "Pound"
          // "Ounce"
        ],
        speedArray: [
          "Miles per hour",
          // "Foot per second",
          "Metre per second",
          "Kilometre per hour"
          // "Knot"
        ],
        timeArray: [
          // "Nanosecond",
          // "Microsecond",
          // "Millisecond",
          "Second",
          "Minute",
          "Hour",
          "Day",
          "Week",
          "Month",
          "Year"
          // "Decade",
          // "Century"
        ]
      };
    },
    calcMethods: function(num, from, to) {
      num = parseInt(num);
      if (from === to) {
        return num;
      } else if (from === "Celsius" && to === "Fahrenheit") {
        return num * (9 / 5) + 32;
      } else if (from === "Celsius" && to === "Kelvin") {
        return num + 273.15;
      } else if (from === "Fahrenheit" && to === "Celsius") {
        return (num - 32) * (5 / 9);
      } else if (from === "Fahrenheit" && to === "Kelvin") {
        return (num - 32) * (5 / 9) + 273.15;
      } else if (from === "Kelvin" && to === "Fahrenheit") {
        return (num - 273.15) * (9 / 5) + 32;
      } else if (from === "Kelvin" && to === "Celsius") {
        return num - 273.15;
      } else if (from === "Miles per hour" && to === "Metre per second") {
        return num / 2.237;
      } else if (from === "Miles per hour" && to === "Kilometre per hour") {
        return num * 1.609;
      } else if (from === "Metre per second" && to === "Miles per hour") {
        return num * 2.237;
      } else if (from === "Metre per second" && to === "Kilometre per hour") {
        return num * 3.6;
      } else if (from === "Kilometre per hour" && to === "Miles per hour") {
        return num / 1.609;
      } else if (from === "Kilometre per hour" && to === "Metre per second") {
        return num / 3.6;
      } else if (from === "Tonne" && to === "Kilogram") {
        return num * 1000;
      } else if (from === "Tonne" && to === "Gram") {
        return num * 1000000;
      } else if (from === "Tonne" && to === "Stone") {
        return num * 157.473;
      } else if (from === "Tonne" && to === "Pound") {
        return num * 2204.623;
      } else if (from === "Kilogram" && to === "Tonne") {
        return num / 1000;
      } else if (from === "Kilogram" && to === "Gram") {
        return num * 1000;
      } else if (from === "Kilogram" && to === "Stone") {
        return num / 6.35;
      } else if (from === "Kilogram" && to === "Pound") {
        return num * 2.205;
      } else if (from === "Gram" && to === "Tonne") {
        return num / 1000000;
      } else if (from === "Gram" && to === "Kilogram") {
        return num / 1000;
      } else if (from === "Gram" && to === "Stone") {
        return num / 6350.293;
      } else if (from === "Gram" && to === "Pound") {
        return num / 453.592;
      } else if (from === "Stone" && to === "Tonne") {
        return num / 157.473;
      } else if (from === "Stone" && to === "Kilogram") {
        return num * 6.35;
      } else if (from === "Stone" && to === "Gram") {
        return num * 6350.293;
      } else if (from === "Stone" && to === "Pound") {
        return num * 14;
      } else if (from === "Pound" && to === "Tonne") {
        return num / 2204.623;
      } else if (from === "Pound" && to === "Kilogram") {
        return num / 2.205;
      } else if (from === "Pound" && to === "Gram") {
        return num * 453.592;
      } else if (from === "Pound" && to === "Stone") {
        return num / 14;
      } else if (from === "Kilometre" && to === "Metre") {
        return num * 1000;
      } else if (from === "Kilometre" && to === "Centimetre") {
        return num * 1000000;
      } else if (from === "Kilometre" && to === "Mile") {
        return num / 1.609;
      } else if (from === "Kilometre" && to === "Yard") {
        return num * 1093.613;
      } else if (from === "Kilometre" && to === "Foot") {
        return num * 3280.84;
      } else if (from === "Kilometre" && to === "Inch") {
        return num * 39370.079;
      } else if (from === "Metre" && to === "Kilometre") {
        return num / 1000;
      } else if (from === "Metre" && to === "Centimetre") {
        return num * 100;
      } else if (from === "Metre" && to === "Mile") {
        return num / 1609.344;
      } else if (from === "Metre" && to === "Yard") {
        return num * 1.094;
      } else if (from === "Metre" && to === "Foot") {
        return num * 3.281;
      } else if (from === "Metre" && to === "Inch") {
        return num * 39.97;
      } else if (from === "Centimetre" && to === "Kilometre") {
        return num / 100000;
      } else if (from === "Centimetre" && to === "Metre") {
        return num / 100;
      } else if (from === "Centimetre" && to === "Mile") {
        return num / 160934.4;
      } else if (from === "Centimetre" && to === "Yard") {
        return num / 91.44;
      } else if (from === "Centimetre" && to === "Foot") {
        return num / 30.48;
      } else if (from === "Centimetre" && to === "Inch") {
        return num / 2.54;
      } else if (from === "Mile" && to === "Kilometre") {
        return num * 1.609;
      } else if (from === "Mile" && to === "Metre") {
        return num * 1609.344;
      } else if (from === "Mile" && to === "Centimetre") {
        return num * 160934.4;
      } else if (from === "Mile" && to === "Yard") {
        return num * 1760;
      } else if (from === "Mile" && to === "Foot") {
        return num * 5280;
      } else if (from === "Mile" && to === "Inch") {
        return num * 63360;
      } else if (from === "Yard" && to === "Kilometre") {
        return num / 1093.613;
      } else if (from === "Yard" && to === "Metre") {
        return num / 1.094;
      } else if (from === "Yard" && to === "Centimetre") {
        return num * 91.44;
      } else if (from === "Yard" && to === "Mile") {
        return num / 1760;
      } else if (from === "Yard" && to === "Foot") {
        return num * 3;
      } else if (from === "Yard" && to === "Inch") {
        return num * 36;
      } else if (from === "Foot" && to === "Kilometre") {
        return num / 3280.84;
      } else if (from === "Foot" && to === "Metre") {
        return num / 3.281;
      } else if (from === "Foot" && to === "Centimetre") {
        return num * 30.48;
      } else if (from === "Foot" && to === "Mile") {
        return num / 5280;
      } else if (from === "Foot" && to === "Yard") {
        return num / 3;
      } else if (from === "Foot" && to === "Inch") {
        return num * 12;
      } else if (from === "Inch" && to === "Kilometre") {
        return num / 39370.079;
      } else if (from === "Inch" && to === "Metre") {
        return num / 39.37;
      } else if (from === "Inch" && to === "Centimetre") {
        return num * 2.54;
      } else if (from === "Inch" && to === "Mile") {
        return num / 63360;
      } else if (from === "Inch" && to === "Yard") {
        return num / 36;
      } else if (from === "Inch" && to === "Foot") {
        return num / 12;
      } else if (from === "Square metre" && to === "Square kilometre") {
        return num / 1000000;
      } else if (from === "Square metre" && to === "Hectare") {
        return num / 10000;
      } else if (from === "Square metre" && to === "Acre") {
        return num / 4046.856;
      } else if (from === "Square kilometre" && to === "Square metre") {
        return num * 1000000;
      } else if (from === "Square kilometre" && to === "Hectare") {
        return num * 100;
      } else if (from === "Square kilometre" && to === "Acre") {
        return num / 247.105;
      } else if (from === "Hectare" && to === "Square metre") {
        return num * 10000;
      } else if (from === "Hectare" && to === "Square kilometre") {
        return num / 100;
      } else if (from === "Hectare" && to === "Acre") {
        return num * 2.471;
      } else if (from === "Acre" && to === "Square metre") {
        return num * 4046.856;
      } else if (from === "Acre" && to === "Square kilometre") {
        return num / 247.105;
      } else if (from === "Acre" && to === "Hectare") {
        return num / 2.471;
      } else if (from === "Second" && to === "Minute") {
        return num / 60;
      } else if (from === "Second" && to === "Hour") {
        return num / 3600;
      } else if (from === "Second" && to === "Day") {
        return num / 86400;
      } else if (from === "Second" && to === "Week") {
        return num / 604800;
      } else if (from === "Second" && to === "Month") {
        return num / 2628000000;
      } else if (from === "Second" && to === "Year") {
        return num / 31540000000;
      } else if (from === "Minute" && to === "Second") {
        return num * 60;
      } else if (from === "Minute" && to === "Month") {
        return num / 43800.048;
      } else if (from === "Minute" && to === "Hour") {
        return num / 60;
      } else if (from === "Minute" && to === "Day") {
        return num / 1440;
      } else if (from === "Minute" && to === "Week") {
        return num / 10080;
      } else if (from === "Minute" && to === "Year") {
        return num / 525600;
      } else if (from === "Hour" && to === "Second") {
        return num * 3600;
      } else if (from === "Hour" && to === "Minute") {
        return num * 60;
      } else if (from === "Hour" && to === "Day") {
        return num / 24;
      } else if (from === "Hour" && to === "Week") {
        return num / 168;
      } else if (from === "Hour" && to === "Month") {
        return num / 730.001;
      } else if (from === "Hour" && to === "Year") {
        return num / 8760;
      } else if (from === "Day" && to === "Second") {
        return num * 86400;
      } else if (from === "Day" && to === "Minute") {
        return num * 1440;
      } else if (from === "Day" && to === "Hour") {
        return num * 24;
      } else if (from === "Day" && to === "Week") {
        return num / 7;
      } else if (from === "Day" && to === "Month") {
        return num / 30.417;
      } else if (from === "Day" && to === "Year") {
        return num / 365;
      } else if (from === "Week" && to === "Second") {
        return num * 604800;
      } else if (from === "Week" && to === "Minute") {
        return num * 10080;
      } else if (from === "Week" && to === "Hour") {
        return num * 168;
      } else if (from === "Week" && to === "Day") {
        return num * 7;
      } else if (from === "Week" && to === "Month") {
        return num / 4.345;
      } else if (from === "Week" && to === "Year") {
        return num / 52.143;
      } else if (from === "Month" && to === "Second") {
        return num * 2628000000;
      } else if (from === "Month" && to === "Minute") {
        return num * 43800.048;
      } else if (from === "Month" && to === "Hour") {
        return num * 730.001;
      } else if (from === "Month" && to === "Day") {
        return num * 30.417;
      } else if (from === "Month" && to === "Week") {
        return num * 4.345;
      } else if (from === "Month" && to === "Year") {
        return num / 12;
      } else if (from === "Year" && to === "Second") {
        return num * 31540000000;
      } else if (from === "Year" && to === "Minute") {
        return num * 525600;
      } else if (from === "Year" && to === "Hour") {
        return num * 8760;
      } else if (from === "Year" && to === "Day") {
        return num * 365;
      } else if (from === "Year" && to === "Week") {
        return num * 52.143;
      } else if (from === "Year" && to === "Month") {
        return num * 12;
      } else {
        console.log("SOme typing error chack again");
      }
    },

    secretCodeFun: function(e) {
      pressed.push(e.key);
      pressed.splice(
        -secretCode.length - 1,
        pressed.length - secretCode.length
      );
      if (pressed.join("").includes(jokes)) {
        chuckJokes();
      } else if (pressed.join("").includes(secretCode)) {
        cornify_add();
      }
      setTimeout(function() {
        document.querySelector(".jokes").innerHTML = "";
      }, 30000);
    }
  };
})();

/**==================UIController=================* */
const UIcontroller = (function() {
  const DOMstrings = {
    inputType: ".add__type",
    leftList: ".left__list",
    rightList: ".right__list",
    leftValue: ".left__value",
    rightValue: ".right__value",
    addToList: ".add__tolist",
    tableBody: ".list__row",
    typeParent: ".type__parent",
    inputTypeNoDots: "add__type",
    dropLeft: ".dropDownList_left",
    dropRight: ".dropDownList_right",
    dropChildLeft: "left__list",
    dropChildRight: "right__list",
    tbTrRemove: ".table__row--remove"
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        leftList: document.querySelector(DOMstrings.leftList).value,
        rightList: document.querySelector(DOMstrings.rightList).value,
        leftInputValue: document.querySelector(DOMstrings.leftValue).value,
        rightInputValue: document.querySelector(DOMstrings.rightValue).value
      };
    },

    getDropInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value
      };
    },

    addItemToList: function(obj, index) {
      const list = document.querySelector(DOMstrings.tableBody);
      const row = document.createElement("tr");
      row.innerHTML = `
        <th scope="row" class="index">${index + 1}</th>
        <td>${obj.tYpe}</td>
        <td>${obj.leftInput}: &nbsp;<strong>${obj.leftValue}</strong></td>
        <td>${obj.rightInput}: &nbsp;<strong>${obj.rightValue}</strong></td>
        <td>${obj.time}</td>
        <td style="display:none">${obj.id}</td>
        <td><a href="#" class="text-danger delete">X</a></td>
  `;
      list.appendChild(row);
    },

    addTypeToList: function(arr, parentClass, childClass) {
      const inputType = document.querySelector(parentClass);
      const select = document.createElement("select");
      select.className = `form-control ${childClass}`;
      for (var i = 0; i < arr.length; i++) {
        select.innerHTML += `
          <option>${arr[i]}</option>
        `;
      }
      inputType.appendChild(select);
    },

    removeDropdownList: function() {
      document.querySelector(".left__list").remove();
      document.querySelector(".right__list").remove();
    },

    showAlert: function(msg, className) {
      const div = document.createElement("div");
      const container = document.querySelector(".card");
      const form = document.getElementById("showAlert");
      div.className = `alert ${className}`;
      div.appendChild(document.createTextNode(msg));
      if (container.contains(document.querySelector(".alert"))) {
        document.querySelector(`.alert`).remove();
        clearTimeout(timedelete);
      }
      container.insertBefore(div, form);
      timedelete = setTimeout(() => {
        document.querySelector(".alert").remove();
      }, 3000);
    },

    deleteFromList: function(target) {
      if (target.className === "text-danger delete") {
        target.parentElement.parentElement.remove();
        return true;
      }
    },

    updateResults: function(value) {
      document.querySelector(DOMstrings.rightValue).value = value;
    },

    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

/**==================Controller=================* */
const controller = (function(convertCtrl, UICtrl) {
  const DOM = UICtrl.getDOMstrings();
  const setupEventListeners = function() {
    document
      .querySelector(DOM.leftValue)
      .addEventListener("input", calculateResults);

    document
      .querySelector(DOM.addToList)
      .addEventListener("click", addItemToList);

    document
      .querySelector(DOM.inputType)
      .addEventListener("change", addItemToDropDown);

    document
      .querySelector(DOM.inputType)
      .addEventListener("change", UICtrl.removeDropdownList);

    document
      .querySelector(DOM.tableBody)
      .addEventListener("click", deleteListItem);

    window.addEventListener("keyup", convertCtrl.secretCodeFun);
    window.addEventListener("change", calculateResults);

    document.addEventListener("DOMContentLoaded", displayFromStore);
  };

  const addItemToList = function() {
    let ID, index;
    const dateNow = Date.now();
    ID = dateNow;
    index = parseInt(convertCtrl.store().getFromLocalStore().length);
    // const time = new Date(dateNow);
    let time = JSON.stringify(new Date(dateNow));
    time = time.replace(/\"/g, "");
    time = time.replace(/\T/g, " ");
    time = time.slice(0, 19);
    const data = UICtrl.getInput();
    const constrct = convertCtrl.addDataToItemList();
    const list = new constrct(
      ID,
      data.type,
      data.leftList,
      data.rightList,
      data.leftInputValue,
      data.rightInputValue,
      time
    );
    UICtrl.addItemToList(list, index);
    UICtrl.showAlert("Saved", "alert-success text-center");
    convertCtrl.store().addToLocalStore(list);
  };

  const displayFromStore = function() {
    let storeData;
    storeData = convertCtrl.store().getFromLocalStore();
    storeData.forEach(function(list, index) {
      UICtrl.addItemToList(list, index);
    });
  };

  const addItemToDropDown = function() {
    const typeValue = UICtrl.getDropInput();
    let array, valueText, arrayText;
    if (typeValue.type) {
      valueText = typeValue.type.toLowerCase();
      arrayText = valueText + "Array";
      array = convertCtrl.addArrays()[arrayText];
      UICtrl.addTypeToList(array, DOM.dropLeft, DOM.dropChildLeft);
      UICtrl.addTypeToList(array, DOM.dropRight, DOM.dropChildRight);
    }
  };

  const deleteListItem = function(e) {
    deleteList = UICtrl.deleteFromList(e.target);
    if (deleteList) {
      UICtrl.showAlert("Deleted!", "alert-danger text-center");
    }
    convertCtrl
      .store()
      .removeFromLocalStore(
        e.target.parentElement.previousElementSibling.textContent
      );
    e.preventDefault();
  };

  const calculateResults = function() {
    const input = UICtrl.getInput();
    const result = convertCtrl.calcMethods(
      input.leftInputValue,
      input.leftList,
      input.rightList
    );
    UICtrl.updateResults(result);
  };

  // const removeTable = function() {
  //   document.querySelector(DOM.tbTrRemove).remove();
  // };

  return {
    init: function() {
      UICtrl.addTypeToList(
        convertCtrl.addTypeArray(),
        DOM.typeParent,
        DOM.inputTypeNoDots
      );
      // removeTable();
      addItemToDropDown();
      setupEventListeners();
      calculateResults();
      console.log("Application has started!!!!!!!!!!!!");
    }
  };
})(converterController, UIcontroller);

controller.init();
