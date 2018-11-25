var execSync = require("child_process").execSync;
var fs = require("fs");
var ipfsAPI = require("ipfs-api");
const ipfs = new ipfsAPI("ipfs.infura.io", "5001", { protocol: "https" });

var lineReader = require("line-reader");

const originalFile = "restMyCase.pdf";

async function main() {
  /*  exec(`pdftk ../${originalFile} burst`, { cwd: "./pages" }, async function(
    err,
    stdout,
    stderr
  ) {
    if (err !== null) {
      throw err;
    }
    console.log(stdout);

    const pdfPages = fs
      .readdirSync("./pages")
      .filter(file => file.startsWith("pg_00"));

    console.log("Found", pdfPages.length, "files.");


    const results = [];
var i = 0;
    for (file of pdfPages) {
      const result = await ipfs.util.addFromFs("pages/" + file);
      results.push(result);
			i++;
			console.log("File", i, result);
    }

		fs.writeFile("./ipfs_results.json", JSON.stringify(results))
*/

  //var results = [];


execSync("mkdir out; mkdir out2;")

  let i = 0;
  lineReader.eachLine("output", (line, last) =>{
    //	console.log(line)
    //  results.push({hash: line, path: "page_"+i+".pdf"})

    i++;

    const filename = "page_" + i + ".pdf";
    const hash = line;

    console.log("generating page " + i);
    execSync(
      `chromium-browser --headless --print-to-pdf="./out/${filename}" "file:///home/connor/Dokumente/Projekte/locationtest/test.html?hash=${hash}"`,
      { stdio: ['pipe', 'pipe', 'ignore']}
    );

		console.log("generated page " + i);

		execSync(`pdftk ./out/${filename} cat 1 output ./out2/${filename}`,
			(err, stdout, stderr) => {
			if (err !== null) {
				throw err;
			}
			console.log(stdout)
			console.log(stderr)


		});

		console.log("removed last page");

		if (last) {
				execSync(`pdftk ./out2/*.pdf cat output final.pdf`);

			return false;
		}

  });
  //});
}

main();
