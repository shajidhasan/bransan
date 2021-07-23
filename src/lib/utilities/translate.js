// const nlp = require("./nlp_compromise.js");

import nlp from "@shajid/nlp_compromise";

const createPadding = (the, frontSpace, backSpace) => {
  the = the == undefined ? true : the;
  frontSpace = frontSpace == undefined ? true : frontSpace;
  backSpace = backSpace == undefined ? true : backSpace;
  let fluff = ["of", "of", "with", "for", "and"];
  let result = " " + fluff[Math.floor(Math.random() * fluff.length)];
  if (the) {
    result += " the";
  }
  result += " ";
  return result;
};

export const translate = (text) => {
  let punctuation = nlp.sentence(text).terminator();
  if (text.charAt(text.length - 1) == punctuation) {
    text = text.substring(0, text.length - 1);
  }
  let terms = nlp.text(text).terms();
  let subject = null; //;nlp.text(text).nouns()[0];//(terms[0].tag=='Person'||terms[0].tag=='Noun')&&terms[0].normal!='i'?terms[0].text:'';
  let verb = null;
  let tensePhrase = "";
  let theRest = "";

  for (let i = 0; i < terms.length; i++) {
    let term = terms[i];
    if (verb != null) {
      if (theRest != "" || !term.pos.Preposition) {
        theRest += " " + term.text;
      }
    }
    if (term.pos.Noun && subject == null) {
      subject = term;
      subject = subject.normal == "i" ? "" : subject.text;
      if (
        i - 1 > -1 &&
        (terms[i - 1].tag == "Adjective" || terms[i - 1].tag == "Adverb")
      ) {
        let padding = "of ";
        if (subject != "") {
          padding = " " + padding;
        }
        subject += padding + terms[i - 1].text;
      }
    } else {
      if (term.pos.Verb && verb == null) {
        tensePhrase = term.conjugation();
        verb = term.text;
        if (tensePhrase == "Gerund") {
          let split = verb.split(" ");
          if (split.length > 1) {
            verb = split[split.length - 1];
            tensePhrase = term.normal.includes("was")
              ? "PastTense"
              : term.normal.includes("were")
              ? "PastTense"
              : term.normal.includes("am")
              ? "Infinitive"
              : term.normal.includes("are")
              ? "Infinitive"
              : term.normal.includes("is")
              ? "Infinitive"
              : "FutureTense";
          }
        }
      }
    }
  }
  if (subject == null) {
    subject = "";
  }
  let isGerund = nlp.verb(verb).conjugation() == "Gerund";
  let conjugations = nlp.verb(verb).conjugate();
  verb = isGerund ? conjugations["infinitive"] : conjugations["gerund"];

  switch (tensePhrase) {
    case "PastTense":
      tensePhrase = "Wasing ";
      break;
    case "PresentTense":
    case "Gerund":
    case "Infinitive":
      tensePhrase = "Ising ";
      break;
    case "FutureTense":
      tensePhrase = "Willing ";
      break;
  }
  if (subject != "") {
    subject = createPadding() + subject;
  }
  verb = createPadding() + verb;
  if (theRest != "") {
    theRest = createPadding(false) + theRest;
  }
  return tensePhrase + subject + verb + theRest + punctuation;
};
