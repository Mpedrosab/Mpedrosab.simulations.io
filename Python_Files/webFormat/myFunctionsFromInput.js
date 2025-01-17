  
    function showEnergy() {
  var x = document.getElementsByClassName("energyClass");
   for (const box of x) {
        box.style.display = "block";
        }

    var y = document.getElementsByClassName("pressClass");
   for (const boxy of y) {
        boxy.style.display = "none";
        }
}
     function showPress() {
  var x = document.getElementsByClassName("pressClass");
   for (const box of x) {
        box.style.display = "block";
        }
    var y = document.getElementsByClassName("energyClass");
   for (const boxy of y) {
        boxy.style.display = "none";
        }
        }
var sphereR=1;	 	 
var stickR=1;
var indexAllPlots;
var totalMol;
var dataDict= {};
var x = [];
var molRuning=false;
var textFile = null;
var myTimeout;
     
        
        
 function makeTextFile(myPath,fileToPlot) {
 
 
        var text=`
from os import listdir
import pandas as pd
import matplotlib.pyplot as plt
from numpy import array
#Read file
try:
    myPath="whatPath"
    if myPath[0]=="/":
        myPath=myPath[1:]
    param="SurfTensionFromGROMACSout_[mN/m]"
    allFiles=[f for f in listdir(myPath) if "myFileToFind" in f and "_withErr.csv" in f]
    
    allFiles.sort()
    allDataMean=pd.DataFrame([])
    fig,ax=plt.subplots()
    for file in allFiles:
        print(file)
        data=pd.read_csv(myPath+file)
        
        allDataMean=allDataMean.append(data)
    
        ax.axvline(x=data[data.columns[1]].iloc[-1], ls='--', label=file.replace("_withErr.csv","").split("_")[-1].split(".")[0])
    
    allDataMean.rename(columns={ allDataMean.columns[1]: "Time_[ps]" }, inplace = True)
    ax.plot(allDataMean["Time_[ps]"],allDataMean[param],"-o",c="blue", ms=4)

    fig.show()
    input("Finish")
except Exception as error:
    print(error)
    print("Error may be cause due to missing data file. Try to download correspondent csv")
    input("Press any key to exit.")
`;



text=text.replace("whatPath", myPath).replace("myFileToFind",fileToPlot)
         var data = new Blob([text], {type: 'text/plain'});
         var textFile = window.URL.createObjectURL(data);
             if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
        
      
 }
        function showPlot(myFile) {
        
        var link = document.createElement('a');
        var loc = window.location.pathname;
var dir = loc.substring(0, loc.lastIndexOf('/'))+'/';
dir=dir.replaceAll('\D:',"D:").replaceAll('\\\\','/').replaceAll('replaceThis',"").replace('/home/mpedrosab/MD/','D:/Documentos_D/Google_Drive_UGR/Membrane-tests').replaceAll('/D:',"D:")
    
    link.setAttribute('download', 'showPlot.py');
    link.setAttribute('style', 'display:"none"');
    console.log(dir)
    link.href = makeTextFile(dir,myFile);
    document.body.appendChild(link);
    
        // wait for the link to be added to the document
    window.requestAnimationFrame(function () {
      var event = new MouseEvent('click');
      link.dispatchEvent(event);
      document.body.removeChild(link);
    });
  
        }



        /*Accordion stuff*/
        function showAccordeon(myID) {
var content = document.getElementById(myID);
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
} 

        function collapseShowAll(myID) {
            if (myID === "hideAll") {
             doInBlocks="none"
             hideBut="allClickHide2"
             showBut="allClickShow2"
                }  
          if (myID === "showAll") {
             doInBlocks="block"
             showBut="allClickHide2"
             hideBut="allClickShow2"
                }
            
var allcontent = document.getElementsByClassName("collapsible_content");
   for (const content of allcontent) {
       content.style.display = doInBlocks;
    }
    var buttonShow = document.getElementById(hideBut);
   buttonShow.style.display="none";
    var buttonShow = document.getElementById(showBut);
   buttonShow.style.display="inline-block";  
  var buttonShow = document.getElementById(hideBut+"2");
   buttonShow.style.display="none";
    var buttonShow = document.getElementById(showBut+"2");
   buttonShow.style.display="inline-block";
} 



//***********************************************************
//For pdb plot

	var glviewer = null;
	var labels = [];

	var addLabels = function() {
		var atoms = glviewer.getModel().selectedAtoms({
			atom : "CA"
		});
		for ( var a in atoms) {
			var atom = atoms[a];

			var l = glviewer.addLabel(atom.resn + " " + atom.resi, {
				inFront : true,
				fontSize : 12,
				position : {
					x : atom.x,
					y : atom.y,
					z : atom.z
				}
			});
			atom.label = l;
			labels.push(atom);
		}
	};
	
	var colorSS = function(viewer) {
		//color by secondary structure
		var m = viewer.getModel();
		m.setColorByFunction({}, function(atom) {
			if(atom.ss == 'h') return "magenta";
			else if(atom.ss == 's') return "orange";
			else return "white";
		});
		viewer.render();
	}

	var atomcallback = function(atom, viewer) {
		if (atom.clickLabel === undefined
				|| !atom.clickLabel instanceof $3Dmol.Label) {
			atom.clickLabel = viewer.addLabel(atom.resid +":"+ atom.name, {
				fontSize : 14,
				position : {
					x : atom.x,
					y : atom.y,
					z : atom.z
				},
				backgroundColor: "black"
			});
			atom.clicked = true;
		}

		//toggle label style
		else {

			if (atom.clicked) {
				var newstyle = atom.clickLabel.getStyle();
				newstyle.backgroundColor = 0x66ccff;

				viewer.setLabelStyle(atom.clickLabel, newstyle);
				atom.clicked = !atom.clicked;
			}
			else {
				viewer.removeLabel(atom.clickLabel);
				delete atom.clickLabel;
				atom.clicked = false;
			}

		}
	};


function readText(fileToShow) {
 //document.getElementById("content").innerHTML='<object type="text/html" data="data.html" ></object>';
    var rawFile = new XMLHttpRequest();
    	console.log("reading file");

    rawFile.onreadystatechange = function ()
    {
	if (this.readyState == 4 && this.status == 200) { 
	//allText = rawFile.responseText.replace(/\r?\n|\r/g,'');
	 lines = rawFile.responseText.split("\n"); 
	 allText=""
        for(i = 0; i < lines.length; i++){ 
            //console.log(lines[i]); 
            if (!lines[i].substring(11,17).includes(" H")){
            allText+=lines[i]+"\n"
            }
        }                
              //  alert(allText);
	// moldata = data = allText;
	 

        }
    }
        rawFile.open("GET", fileToShow, false);

    rawFile.send(null);
 // moldata = data = $("#mymol").val();

return allText;
};



function plotMol(data) {
 	 
		//console.log("printing");

	 glviewer.clear()
	  receptorModel = m = glviewer.addModel(data, "pqr");
	  
	  atoms = m.selectedAtoms({});
	  
	//for ( var i in atoms) {
	//	var atom = atoms[i];
	//	atom.clickable = true;
	//	atom.callback = atomcallback;
	//}
	  			
	glviewer.setStyle({resn: 'CHL1'}, {stick: { radius: stickR,color: "grey"}});
 
	glviewer.setStyle({resn: 'CHL'}, {stick: { radius: stickR,color: "grey"}});
	glviewer.setStyle({resn: 'DPP'}, {stick: { radius: stickR,color: "green"}});
	glviewer.setStyle({resn: 'CURe'}, {stick: { radius: 3,color: "orange"}});
	glviewer.setStyle({resn: 'CUR'}, {stick: { radius: stickR,color: "orange"}});
	glviewer.setStyle({elem: 'P'}, {sphere: {color: "yellow",  radius: sphereR}});
	glviewer.setStyle({elem: 'N'}, {sphere: {color: "yellow",  radius: sphereR}});
	glviewer.setStyle({elem: 'O', resn: "DPP"}, {sphere: {color: "yellow",  radius: sphereR}});
	glviewer.setStyle({elem: 'O', resn: "CHL"}, {sphere: {color: "purple",  radius: sphereR}});
	glviewer.setStyle({elem: 'O', resn: "CHL1"}, {sphere: {color: "purple",  radius: sphereR}});
	glviewer.setStyle({elem: 'O', resn: "CURe"}, {sphere: {color: "red",  radius: sphereR}});
	glviewer.setStyle({elem: 'O', resn: "CUR"}, {sphere: {color: "red",  radius: sphereR}});
	glviewer.setStyle({resn: 'SOL'}, {sphere: {color: "blue", radius:1}});
	//glviewer.setStyle({resn: 'SOL'}, {line: {color: "blue", opacity: "0.0", linewidth:1}});
	
	//console.log(data);
	  glviewer.mapAtomProperties($3Dmol.applyPartialCharges);
	  glviewer.render();
	  

};
//$(document).ready(function() {
//loadPlots()	
//});

var tails="_RDF_Plot.png";
var indexAllPlots;
var totalPlots;
var allTitles=[];
var xPlots=[]
var x=[]
function loadPlots() {
	
	
for(var count = 0; count < allTitles.length; count++) {
    //console.log(allTitles[count]);
    allTitles[count]=allTitles[count].replace("D:/Documentos_D/Google_Drive_UGR/Membrane-tests/","")
    const lastIndex = allTitles[count].lastIndexOf('/');
    const before = allTitles[count].slice(0, lastIndex);
    const after = allTitles[count].slice(lastIndex + 1);
        console.log("../"+before+"/Analysis/"+after.replace(".pdb",""));

    x.push("../"+allTitles[count]);
    xPlots.push("../"+before+"/Analysis/"+after.replace(".pdb",""));
    dataDict[x[count]]=""
}

indexAllPlots=count-1
totalPlots=count
indexAllPlots=count-1;
totalMol=count;

console.log("hola");
	document.getElementById("allPlotsInner").src=xPlots[indexAllPlots]+tails
	document.getElementById("plotsTitle").innerText=xPlots[indexAllPlots]
	
}

function plotRDF() {
	tails="_RDF_Plot.png"
	document.getElementById("allPlotsInner").src=xPlots[indexAllPlots]+tails
		document.getElementById("plotsTitle").innerText=xPlots[indexAllPlots]

	}
function plotPress() {
	tails="_plotDataMyPress.png"
	document.getElementById("allPlotsInner").src=xPlots[indexAllPlots]+tails
		document.getElementById("plotsTitle").innerText=xPlots[indexAllPlots]

	}
function plotDens() {
	tails="_plotDensity.png"
	document.getElementById("allPlotsInner").src=xPlots[indexAllPlots]+tails
		document.getElementById("plotsTitle").innerText=xPlots[indexAllPlots]

	}
function plotEnergy() {
	tails="_plotDataMyEnergy.png"
	document.getElementById("allPlotsInner").src=xPlots[indexAllPlots]+tails
		document.getElementById("plotsTitle").innerText=xPlots[indexAllPlots]

	}
	

function plotUp() {
	indexAllPlots+=1	

	if ( indexAllPlots==totalPlots ) {
		indexAllPlots=0;
	}
	document.getElementById("allPlotsInner").src=xPlots[indexAllPlots]+tails

		document.getElementById("plotsTitle").innerText=xPlots[indexAllPlots]

};
function plotDown() {
	indexAllPlots-=1	

	if ( indexAllPlots< 0 ) {
		indexAllPlots=totalPlots;
	}
	document.getElementById("allPlotsInner").src=xPlots[indexAllPlots]+tails
	document.getElementById("plotsTitle").innerText=xPlots[indexAllPlots]

	
};



function showMol() {
var data=document.getElementById("fname").value
allTitles=data.split("\n")
loadPlots();
 document.getElementById("gldiv").style.display = "block";

	glviewer = $3Dmol.createViewer("gldiv", {
		defaultcolors : $3Dmol.rasmolElementColors
	});
	glviewer.setBackgroundColor('#eeeeee');


console.log(x[indexAllPlots])
dataPlot=readText(x[indexAllPlots]);
dataDict[x[indexAllPlots]]=dataPlot;

 plotMol(dataPlot)
 	  glviewer.zoomTo();

 document.getElementById("showMol").style.display = "none";
 document.getElementById("molStuff").style.display = "block";
document.getElementById("molName").innerHTML = x[indexAllPlots].replace("../","");
var last=indexAllPlots-10; 

if ( last <=0 ) {
last=0;	
}
for(var count = indexAllPlots; count > last; count--) {

//for(var count = 0; count < allTitles.length; count++) {
dataPlot=readText(x[count]);
dataDict[x[count]]=dataPlot;
plotMol(dataPlot)
}
indexAllPlots=count-1
};


function molUp() {
	indexAllPlots+=1	

	if ( indexAllPlots==totalMol ) {
		indexAllPlots=0;
	}
	
	if (dataDict[x[indexAllPlots]]=="")
	{
	console.log("No data still for "+x[indexAllPlots])

	dataPlot=readText(x[indexAllPlots]);
	dataDict[x[indexAllPlots]]=dataPlot;


	}
console.log("Plotting "+indexAllPlots+": "+x[indexAllPlots])

plotMol(dataDict[x[indexAllPlots]])
document.getElementById("molName").innerHTML = x[indexAllPlots].replace("../","");

plotUp();	
};

function molDown() {
	indexAllPlots-=1	

	if ( indexAllPlots==-1 ) {
		indexAllPlots=totalMol-1;
	}
	if (dataDict[x[indexAllPlots]]=="")
	{
		console.log("No data still for "+x[indexAllPlots])
	dataPlot=readText(x[indexAllPlots]);
	dataDict[x[indexAllPlots]]=dataPlot;


	}
//console.log("Plotting "+indexAllPlots+": "+x[indexAllPlots])

plotMol(dataDict[x[indexAllPlots]])
document.getElementById("molName").innerHTML = x[indexAllPlots].replace("../","");
plotDown();
	
	
};


function runMol() {
	if ( molRuning ) {
		clearInterval(myTimeout)
		document.getElementById("molRun").innerHTML="Run";
		molRuning=false;
	} else {
		document.getElementById("molRun").innerHTML="Stop";
	
	myTimeout=setTimeout(console.log("hola"), 100);
	molRuning=true;
	}
}