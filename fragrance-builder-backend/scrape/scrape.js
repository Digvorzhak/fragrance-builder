const fs = require("fs");
const cheerio = require("cheerio");

const notes = async () => {
  const $ = cheerio.load(fs.readFileSync("../scrape/notes.html"));
  const notesArray = [];
  const links = $(".cell").each((i, el) => {
    const image = $(el).find("img").attr("src");
    const note = $(el).find("a").text().trim();
    const obj = {
      image: image,
      note: note,
    };
    notesArray.push(obj);
  });
  console.log(notesArray);
  fs.writeFile("notes.json", JSON.stringify(notesArray), (err) => {
    if (err) {
      throw err;
    }
    console.log("File Saved!");
  });
};

notes();
