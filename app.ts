import * as dotenv from "dotenv";
import fs from "fs";
dotenv.config();
import { Configuration, OpenAIApi } from "openai";

const main = async () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  // Assume the text file is located in the same directory as the script
  const filePath = "./titles.txt";

  // Read the file line by line
  const stream = fs.createReadStream(filePath, { encoding: "utf8" });
  const headlines = new Set<string>();

  stream.on("data", (chunk: string) => {
    // Split the chunk into lines
    const lines = chunk.split("\n");

    // Process each line
    for (const line of lines) {
      if (line.length > 12) {
        headlines.add(line);
      }
    }
  });

  stream.on("end", async () => {
    console.log("Finished reading file");

    const lines = Array.from(headlines);
    for (let index = 0; index < lines.length; index++) {
      const line = lines[index];

      const prompt = `Write a long, very detailed, highly SEO optimized article on '${line}'. The writing must be very engaging, and informative. Cover all factors. Write 3000 words minimum. Wrap the headings with H1, H2 and H3 html tags and list items with ul or li elements. Make sure no paragraphs are longer than 3-4 sentences.`;

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        temperature: 1,
        max_tokens: 4096,
      });

      const data = response.data.choices[0].text;
      const fileName = line.replace(/[^a-zA-Z ]/g, "");

      if (data) {
        fs.writeFileSync(`output/${fileName}NOEDITS.html`, data)
        const dataWithBreaks = data.replace(/(\r\n|\n|\r)/gm, "<br />");
        fs.writeFileSync(`output/${fileName}WITHBREAKS.html`, dataWithBreaks);
        const saveData = data.replace(/(\r\n|\n|\r)/gm, "");
        fs.writeFileSync(`output/${fileName}FORMATTED.html`, saveData);
      }
    }
  });
};
main();
