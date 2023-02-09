const functions = require("firebase-functions");

const app = express();

app.use(cors({ origin: true }));

exports.apicall = functions.https.onRequest((req, response) => {
  const data = req?.query?.qs || null;

  if (!data) {
    response.send("데이터 없자나");
  }

  const formData = {
    model: "text-davinci-003",
    prompt: `${data}`,
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: [" Human:", " AI:"],
  };
  const options = {
    url: "https://api.openai.com/v1/completions",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + "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",
    },
    form: formData,
  };

  app.post(options, formData, (req, res) => {
    console.log(res);
    res.send("query가 있네요");
  });
});
