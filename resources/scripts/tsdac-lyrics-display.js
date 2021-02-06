const lyricsFlorDeBelem = `
<a href="resources/tabs/tsdac/flor-de-belem.txt">View tabs</a>
<br><br>
When I first saw you I tumbled and toiled and labored to hear, you my king<br>
Perched on the skyline, you sounded above me<br>
I laid down and spread out my wings<br>
You listened, I told you: you've hurt me, I love you, I need you, I hate you, my friend<br>
Only now you choose to descend<br>
<br> 
Tossing and turning, I felt you below me<br>
Your body cold, I touched your mould, I felt you old and somehow lonely<br>
I saw you tread across the power lines<br>
Down the only roads you recognized <br>
I asked you where you set your sight<br>
You took a sigh and then replied<br>
"My, this city quickly broke without me."<br>
<br> 
The carpenters cleaned you, the weavers had held you,<br>
They said you let spill out your name<br>
Along with with a calling for me, or for anyone <br>
"Beija-me flor de Belém,<br>
I know somewhere you're still the same."<br>
I walked on the granite of your lemon garden<br>
An angel had plucked them for me<br>
The hedgerows had opened, the center unfolded, I walked into your mausoleum<br>
Light strung from heaven, down, like a weapon, cleaving the dust and the green<br>
When did you build this machine?<br>
`

const lyricsTheWren = `
<a href="resources/tabs/tsdac/the-wren.txt" , target="_blank">View tabs</a>
<br><br>
Sing a song, lover<br>
Make it long<br>
So that when I'm back<br>
You're not yet done<br>
<br>
Let go my hand, lover<br>
It's time to go<br>
I've got your face memorized<br>
Your roman nose<br>
<br>
Though, years from now,<br> 
Who knows?<br>
That face will wane<br>
Time, who draws these aging lines,<br>
Should cast its shade<br>
<br>
So I,<br>
Drunk on wine,<br>
Turn away<br>
<br>
And the nights<br>
Start to wind<br>
Around <br>
Connecting flights<br>
And unbought tickets to Venus<br>
<br>
You're<br> 
Just the pin<br>
That holds <br>
As we spin<br>
Coiling on<br>
This orrery <br>
<br>
Sing a song, lover,<br>
Make it hurt<br>
Make it known that we leave<br>
So much undone<br>
<br>
Our weighed chests,<br>
Which, brazen, bear<br>
A thousand words<br>
Each one a silent testament<br>
Spelling a poem:<br>
<br>
Deixo meu coração<br>
Em suas mãos<br>
Enfim, então<br>
Atravesso so<br>
Esse país<br>
O seu meu lampião<br>
<br>
Lá,<br>
Te vejo lá,<br>
Na Abolição<br>
<br>
Is what I'd write, <br>
What I'd pen<br>
What I'd say<br>
If only then<br>
Your wild eyes<br>
Met mine again<br>
<br>
And now<br>
I, the wren,<br>
Am to fly<br>
At your command<br>
Yet this bird <br>
Longs for the cage again<br>
`

const lyricsMary = `
<a href="resources/tabs/tsdac/mary.txt" , target="_blank">View tabs</a>
<br><br>
I broke into a run<br>
At the snap of a gun<br>
My feet went ankle deep into the deluging<br>
Streets, under the rain and sun<br>
<br>
Please, God, I'm done<br>
<br>
And from within the earth<br>
Came a beating drum<br>
Which sounded as a pulse<br>
Bouncing off the raindrops, then to my bones<br>
<br>
Mary lit her leaves,<br>
I stood in their smoke<br>
And that moment I knew<br>
the lord perched onto me<br>
and wouldn't let go<br>
<br>
Mary lit her leaves<br>
I stood in their smoke<br>
So as I ran from the men with the gun in their hands<br>
I felt my body burn<br>
<br>
Please, God, I'm done<br>
<br>
I called my love<br>
with cause to mourn<br>
Embraced, alone<br>
She softly told:<br>
<br>
I wish above<br>
a light would burn<br>
and strip our skins<br>
of bark and mold<br>
<br>
Instead, the sky <br>
drapes, a cloth,<br>
punctured by<br>
scathing knives<br>
<br>
And as she closed<br>
her hand on mine<br>
All those blades<br>
Were coming down<br>
<br>
Please, God, I'm done<br>
<br>
All those years of chemicals<br>
at the dry cleaner<br>
Made Mary's hands spindly<br>
and sallowed<br>
But still, as she lit her match<br>
There was a preserved elegance to them <br>
<br>
All those years of blades at the meatpacker<br>
Made Joseph's leg atrophied and cold<br>
Still, when he ran and he cried and he ducked<br>
it worked just fine, though<br>
`

const lyricsMother = `
<a href="resources/tabs/tsdac/mother.txt" , target="_blank">View tabs</a>
<br><br>
Oh, mother, come home<br>
This house's so empty without your warmth<br>
The wood sags, the floorboards moan<br>
Your nerves softly hum inside the walls<br>
<br>
Remember last July, when we let the birds escape?<br>
I came home, the window ajar, and an empty cage<br>
We followed the trail of feathers down the alleyway<br>
You sat on the garden chair and said "why won't they stay?"<br>
<br>
Oh, mother, come home<br>
Every day I miss you more<br>
If only I had known before<br>
What a mother's love is worth<br>
<br>
Remember when, remember when?<br>
We lived up a dozen floors<br>
You held my hand as I went down<br>
Floating to the streets below,<br>
Gently coasting on Abolição<br>
Then sweeping up toward the sun<br>
And all the city's people'd point<br>
At the figures sailing on,<br>
Silhouettes, hand in hand, against the big blue sky<br>
<br>
Oh, we age and we mourn<br>
We all leave, we all roam<br>
One day we leave and don't come home<br>
This day will come for you too, mom<br>
`

const $florDeBelem = $('#flor-de-belem');
var florDeBelemSelected = false;
const $theWren = $('#the-wren');
var theWrenSelected = false;
const $mary = $('#mary');
var marySelected = false;
const $mother = $('#mother');
var motherSelected = false;


function resetUnderlines(){
    $florDeBelem.css({ "text-decoration": "none" });
    $theWren.css({ "text-decoration": "none" });
    $mary.css({ "text-decoration": "none" });
    $mother.css({ "text-decoration": "none" });
}


$florDeBelem.mouseenter(function () {
    $florDeBelem.css({ "text-decoration": "underline" });
});

$florDeBelem.mouseleave(function () {
    if (!florDeBelemSelected) {
        $florDeBelem.css({ "text-decoration": "none" });
    }
});

$florDeBelem.click(function () {
    florDeBelemSelected = true;
    theWrenSelected = false;
    motherSelected = false;
    marySelected = false;
    resetUnderlines();
    $florDeBelem.css({ "text-decoration": "underline" });
    document.getElementById('lyrics-display').innerHTML = lyricsFlorDeBelem;
});


$theWren.mouseenter(function () {
    $theWren.css({ "text-decoration": "underline" });
});

$theWren.mouseleave(function () {
    if (!theWrenSelected) {
        $theWren.css({ "text-decoration": "none" });
    }
});

$theWren.click(function () {
    florDeBelemSelected = false;
    theWrenSelected = true;
    motherSelected = false;
    marySelected = false;
    resetUnderlines();
    $theWren.css({ "text-decoration": "underline" });
    document.getElementById('lyrics-display').innerHTML = lyricsTheWren;
});


$mary.mouseenter(function () {
    $mary.css({ "text-decoration": "underline" });
});

$mary.mouseleave(function () {
    if (!marySelected) {
        $mary.css({ "text-decoration": "none" });
    }
});

$mary.click(function () {
    florDeBelemSelected = false;
    theWrenSelected = false;
    motherSelected = false;
    marySelected = true;
    resetUnderlines();
    $mary.css({ "text-decoration": "underline" });
    document.getElementById('lyrics-display').innerHTML = lyricsMary;
});


$mother.mouseenter(function () {
    $mother.css({ "text-decoration": "underline" });
});

$mother.mouseleave(function () {
    if (!motherSelected) {
        $mother.css({ "text-decoration": "none" });
    }
});

$mother.click(function () {
    florDeBelemSelected = false;
    theWrenSelected = false;
    motherSelected = true;
    marySelected = false;
    resetUnderlines();
    $mother.css({ "text-decoration": "underline" });
    document.getElementById('lyrics-display').innerHTML = lyricsMother;
});