var execSync = require('child_process').execSync
var fs = require('fs')
var ipfsAPI = require('ipfs-api')
const ipfs = new ipfsAPI('ipfs.infura.io', '5001', { protocol: 'https' })

var sleep = require('sleep');

var lineReader = require('line-reader')

const originalFile = 'restMyCase.pdf'

async function main() {
	// exec(`pdftk ./${originalFile} burst`, { cwd: "./pages" }, async function(
	//   err,
	//   stdout,
	//   stderr
	// ) {
	//   if (err !== null) {
	//     throw err;
	//   }
	//
	//   console.log(stdout);
	// }
	// const pdfPages = fs
	// 	.readdirSync('./pages')
	// 	.filter(file => file.startsWith('pg_00'))
  //
	// console.log('Found', pdfPages.length, 'files.')
  //

	/*
	const results = []
	var j = 0
	for (file of pdfPages) {
    if(j< 2){
      const result = await ipfs.util.addFromFs('pages/' + file)
  		results.push(result)
  		j++
  		console.log('File', j, result)
    }
	}

	console.log('writing file')
	fs.writeFile('./output.json', JSON.stringify(results))
	console.log('file written')

	var results = [];

	*/

	//execSync("mkdir out; mkdir out2;")

	let i = 0

	var file = JSON.parse(fs.readFileSync("ipfs_results.json", "utf8"))
	file.forEach(line => {
  //lineReader.eachLine("ipfs_results.json", async (line, last) => {
		// results.push({hash: line, path: "page_"+i+".pdf"})
		// console.log(results)
		i++
			//const filename = "page_" + i + ".pdf";

			const filename = line[0].path
			const hash = line[0].hash;
			console.log("generating page " + i);

			execSync(
			  `chrome --headless --print-to-pdf="/Users/katotopark/Documents/woerk/kod/tez/Booklet Generation/out/${filename}" "file:///Users/katotopark/Documents/woerk/kod/tez/Booklet Generation/page.html?hash=${hash}"`,
			  { stdio: ['pipe', 'pipe', 'ignore']}
			);

			console.log("before sleep")
					sleep.sleep(1);
			console.log("after sleep")

			/*

			, (err, stdout, stderr) =>{
				console.log(err)
				console.log(stdio)
				console.log(stdout)
			}
			*/

			console.log("generated page " + i);

	//console.log(`pdftk ./out/${filename} cat 1 output ./out2/${filename}`)
			execSync(`pdftk ./out/${filename} cat 1 output ./out2/${filename}`,
				(err, stdout, stderr) => {
				if (err !== null) {
					throw err;
				}
				console.log(stdout)
				console.log(stderr)


			});

			console.log('removed last page')

			//if (last) {


				//return false
			//}
			return

	})
	execSync(`pdftk ./out2/*.pdf cat output final.pdf`)
}

main()
