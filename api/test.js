import fetch from 'node-fetch';
import DOMParser from 'dom-parser';

const getProgressData = async function () {
  let data = [];

  await fetch("https://www.brandonsanderson.com/", {
  })
    .then((response) => {
      return response.text();
    })
    .then((html) => {
      let parser = new DOMParser();
      let doc = parser.parseFromString(html, "text/html");
      let labels = doc.getElementsByClassName("vc_label");

      for (let i = 0; i < labels.length; i++) {
        let label = labels[i].textContent;
        let splitted = label.split(' ');
        data.push({
          title: splitted.slice(0, -1).join(' '),
          percentage: parseInt(splitted.slice(-1)[0].slice(0, -1)),
        });
      }
    })
  return data;
}
getProgressData().then((data) => console.log(data));
