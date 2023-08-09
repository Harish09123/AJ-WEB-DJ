Song1 = "";
Song2 = "";
leftWristX = 0;
leftWristY = 0;
RightWristX = 0;
RightWristY = 0;
status = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;



function preload()
{
    Song1 = loadSound("Song1.mp3");
    Song2 = loadSound("Song2.mp3");
}



function setup()
{
    canvas = createCanvas(600, 500);
    canvas.position(450,250)

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 600, 500); 

   
    fill('#FF0000');
    stroke('#FF0000');

    status = Song1.isPlaying();
    console.log(status);

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        Song2.stop();
        if(status == false)
        {
            Song1.play();
        }
        else
        {
            document.getElementById("song_id").innerHTML = "Song1 is playing";
        }
    }


    status = Song2.isPlaying();
    console.log(status);

    if(scoreRightWrist > 0.2 )
    {
        circle(RightWristX, RightWristY, 20);
        Song1.stop();
        if(ststus == false)
        {
            Song2.play();
        }
        else{
            document.getElementById("song_id").innerHTML = "Song2 is playing"
        }
    }
}

function play()
{
    song.play();
}

function gotPoses(results)
{
    if (results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log(" leftWristX = " + leftWristX + " leftWristY = " + leftWristY);


        RightWristX = results[0].pose.RightWrist.x;
        RightWristY = results[0].pose.RightWrist.y;
        console.log(" RightWristX = " + RightWristX + " RightWristY = " + RightWristY);

        
        
    }

}

function modelLoaded()
{
    console.log("PoseNet Is Initalized");
}



