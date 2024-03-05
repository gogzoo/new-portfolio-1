function backgroundSlide(wrapperClass, slideSpeed, direction) {

    var viewWidth = innerWidth; // 화면너비

    var itemWidth = $(`${wrapperClass}>div`).css("width");
    itemWidth = itemWidth.split('p')[0];
    itemWidth = parseInt(itemWidth); // 요소의 너비

    var reapeatElement = Math.ceil(viewWidth/itemWidth) + 1; // 보이는 화면에서 요소를 얼마나 넣을 수 있는지.

    var alignLeftOffset = itemWidth; // 매번 얼마나 뒤에 배치될 것인지.

    var wrap = $(`${wrapperClass}>div`).length;
    var i = 0;


    while (wrap <= reapeatElement){ // 요소들을 자동으로 뒤로 채우는 용도

        var clonedDiv = $(`${wrapperClass}>div:first-child`).clone();

        clonedDiv.appendTo(wrapperClass);

        $(`${wrapperClass}>div:last-child`).css("left", `${alignLeftOffset}px`);
        alignLeftOffset += itemWidth;

        wrap = $(`${wrapperClass}>div`).length;

        if (wrap.length >= reapeatElement){
            break;
        }
    }

    // 매개변수로 넣은 wrapper에 class 추가하고, 일반적 css 속성 추가하기

    $(wrapperClass).addClass(".slideWrapper");
    $(wrapperClass).css({
        "position": "absolute",
        "margin": "0",
        "overflow": "hidden",
        "width": "300%",
        })
    $(`${wrapperClass}>div`).css({
        "position": "absolute",
        "display": "inline-block",
        })

    // 매개변수로 넣은 속도 기준으로 setInterval에 들어갈 시간 구하기

    var slideTime;
    var slideDistance = innerWidth;

    slideTime = slideDistance / slideSpeed;

    // 매개변수로 넣은 left, right에 따라 방향이 바뀌게 설정

    if(direction == "left"){

        function moveSlide(wrapperClass, slideTime){

            $(wrapperClass).animate({marginLeft: `-${itemWidth}px`}, slideTime, "linear", function(){
                $(`${wrapperClass}>div`).first().appendTo(wrapperClass);
                $(wrapperClass).css("margin-left", "0px");
            });
        }
    
        moveSlide(wrapperClass, slideTime);
    
        setInterval(function(){moveSlide(wrapperClass, slideTime)}, slideTime);

    }else if(direction == "right"){

        $(`${wrapperClass}>div`).last().prependTo(wrapperClass);
        $(wrapperClass).css("left", `-${itemWidth*2}px`);

        function moveSlideRight(wrapperClass, slideTime){

            $(wrapperClass).animate({left: `0px`}, slideTime, "linear", function(){
                $(`${wrapperClass}>div`).last().prependTo(wrapperClass);
                $(wrapperClass).css("left", `-${itemWidth*2}px`);
            });
        }

        moveSlideRight(wrapperClass, slideTime);

        setInterval(function(){moveSlideRight(wrapperClass, slideTime)}, slideTime);
    }   

    // 정보를 출력하는 함수

    function outputInfo(wrapperClass){
        console.log($(wrapperClass).attr("class") + "에 대한 화면 너비: " + viewWidth)
        console.log($(wrapperClass).attr("class") + "에 대한 아이템 너비: " + itemWidth)
        console.log($(wrapperClass).attr("class") + "에 대한 좌측 위치: " + alignLeftOffset)
        console.log($(wrapperClass).attr("class") + "에 대한 몇개 반복?: " + reapeatElement)
        console.log($(wrapperClass).attr("class") + "에 대한 아이템 모음 길이: " + wrap)
    }

    // 필요 시 출력
    // outputInfo(wrapperClass);

}