

let name_data;

const get_name_data = async () => {
  await fetch("json/data.json")
    .then(response => response.json())
    .then(json => {
      name_data = json;

    });
};

await get_name_data();


$(function () {


  $("#btn_start").on("click", function () {
    let qty = $("#qty").val();
    let gender = $("#gender").val();

    let first_name = name_data["first_name"];
    let last_name;

    if (gender == "male") {
      last_name = name_data["last_name"]["male"];
    } else if (gender == "female") {
      last_name = name_data["last_name"]["female"];
    } else {
      last_name = name_data["last_name"]["male"].concat(name_data["last_name"]["female"]);
    }

    let idx_first_name;
    let idx_last_name1;
    let idx_last_name2;

    let output = [];
    let idx = qty - 1;

    let temp_name = "";

    while (idx >= 0) {
      idx_first_name = Math.floor(Math.random() * first_name.length);
      idx_last_name1 = Math.floor(Math.random() * last_name.length);


      idx_last_name2 = Math.floor(Math.random() * last_name.length);

      if (idx_last_name1 == idx_last_name2) {
        while (idx_last_name1 == idx_last_name2) {
          idx_last_name2 = Math.floor(Math.random() * last_name.length);
        }
      }

      temp_name = first_name[idx_first_name] + last_name[idx_last_name1] + last_name[idx_last_name2];

      if (first_name[idx_first_name] == "" || first_name[idx_last_name1] == "" || first_name[idx_last_name2] == "") { continue; }

      if (temp_name == "") {
        conosle.log(idx_first_name);
        conosle.log(idx_last_name);
        break;
      }

      if (output.includes(temp_name)) { continue; }

      output[idx] = temp_name;


      idx -= 1;

    }

    let template = $('#template')[0].innerHTML;
    let txt_output = "";
    for (let i = 0; i < output.length; i++) {
      txt_output += template.replace("{{ value }}", output[i]);
    }

    $("#table tbody").html("");
    $("#table").append(txt_output);




  }); //end btn_start onclick

  $("#btn_table2excel").on("click", function () {

    TableToExcel.convert(document.getElementById("table"), {
      name: "姓名.xlsx",
      sheet: {
        name: "sheet1"
      }
    });
  })//end btn onclick

  $("#btn_pdf").on("click", function () {

    // https://ekoopmans.github.io/html2pdf.js/
    
    var element = document.querySelector('#div_print_me');
    var opt = {
      margin: [0.5,0,0.5,0], //[top, left, bottom, right]
      filename: '姓名.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf().set(opt).from(element).save();

  })//end btn onclick



});//end document ready