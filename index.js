let table = '';
let cookies = document.cookie;
console.log(cookies);
let cookieslist = cookies.split(';');
//Cookie仕分け
cookieslist.forEach(function(car){
    let content = car.split('=');
    content[0] = content[0].trim();
    if(content[0] == 'table'){
        table = content[1];
    };
});
if(table !== ''){
    table = [...table];
    table.forEach(function(car){
        if(car == 0){
            table[table.indexOf(car)] = '';
        };
    });
    document.querySelectorAll('.cell').forEach(function(car){
        car.innerHTML = table[Array.from(document.querySelectorAll('.cell')).indexOf(car)];
    });
};


//開く
let on = 0;
function pickappear(e){
    let pick = document.createElement('div');
    pick.setAttribute('class','pickbox');
    for (let i = 1; i <= 9; i++){
        let pickcell = document.createElement('div');
        pickcell.innerHTML = i;
        pick.appendChild(pickcell);
    };
    pick.appendChild(document.createElement('div'))
    e.target.appendChild(pick);
    setTimeout(() => {
        document.querySelector('.pickbox').style.height = '140px';
        e.target.classList.toggle('open');
        on = 1;
    }, 1);
};
document.querySelectorAll('.cell').forEach(function(car){
    car.addEventListener('click',function(event){
        if(on == 0){
            pickappear(event);
        } else if (on == 1 && !event.target.parentElement.classList.contains('pickbox') && !event.target.classList.contains('open')){
            setTimeout(() => {
                pickappear(event);
            }, 40);
        };
    });
});
//入力
document.getElementById('table').addEventListener('click',function(event){
    if(event.target.parentElement.classList.contains('pickbox')){
        event.target.parentElement.parentElement.innerHTML = event.target.innerHTML;  //この操作でpickboxは消える
        document.querySelector('.open').classList.toggle('open');
        on = 0;
        helping = 'off';
        document.querySelectorAll('.hints>.hint').forEach(function(car){
            car.remove();
        });
        document.querySelectorAll('#solver>div').forEach(function(car){
            car.style.height = '';
        });
    };
});
//閉じる
document.addEventListener('click',function(){
    if(on == 1 && document.querySelector('.pickbox') !== null){
        document.querySelector('.open').classList.toggle('open');
        on = 0;
        document.querySelector('.pickbox').remove();
    };
});
//error
let errorcount
function error(){
    document.querySelectorAll('.cell').forEach(function(car){
        car.style.background = '';
    });
    document.querySelectorAll('.frame').forEach(function(car){
        car.style.display = '';
    });
    errorcount = 0;
    for (let i = 1; i <= 9; i++){
        for (let ii = 1; ii <= 9; ii++){
            let selector = '.row' + ii;
            let judge = Array.from(document.querySelectorAll(selector)).filter(value => value.innerHTML == i);
            if(judge.length > 1){
                judge.forEach(function(car){
                    car.style.background = 'rgba(255,0,0,0.3)';
                });
                errorcount += 1;
            };
        };
        for (let ii = 1; ii <= 9; ii++){
            let selector = '.column' + ii;
            let judge = Array.from(document.querySelectorAll(selector)).filter(value => value.innerHTML == i);
            if(judge.length > 1){
                judge.forEach(function(car){
                    car.style.background = 'rgba(255,0,0,0.3)';
                });
                errorcount += 1;
            };
        };
        for (let ii = 1; ii <= 9; ii++){
            let selector = '.box' + ii;
            let judge = Array.from(document.querySelectorAll(selector)).filter(value => value.innerHTML == i);
            if(judge.length > 1){
                judge.forEach(function(car){
                    car.style.background = 'rgba(255,0,0,0.3)';
                });
                errorcount += 1;
            };
        };
    };
};
error();
document.addEventListener('click',function(){
    if(helping == 'off'){
        error();
    };
});

//Cookie保存
document.addEventListener('click',function(){
    let savecookie = '';
    document.querySelectorAll('.cell').forEach(function(car){
        if(car.innerHTML >= 1 && car.innerHTML <= 9){
            savecookie += car.innerHTML;
        } else {
            savecookie += 0;
        };
    }); 
    document.cookie = 'table=' + savecookie + '; max-age=31536000';
});

//reset
document.getElementById('reset').addEventListener('click',function(){
    document.getElementById('confirm').style.display = 'block';
});
document.querySelector('#resetbox .yes').addEventListener('click',function(){
    document.querySelectorAll('.cell').forEach(function(car){
        car.innerHTML = '';
        car.style.background = '';
        document.cookie = 'table=; max-age=0';
    });
    document.querySelectorAll('.hint').forEach(function(car){
        car.remove();
    });
    document.querySelectorAll('#solver>div').forEach(function(car){
        car.style.height = '';
    });
    document.querySelectorAll('.frame').forEach(function(car){
        car.style.display = '';
    });
    document.getElementById('confirm').style.display = '';
});
document.querySelector('#resetbox .no').addEventListener('click',function(){
    document.getElementById('confirm').style.display = '';
});

//serch
let helping = 'off';
let base = [];
let level1 = [];
let level2 = [];
let level3 = [];
let level4 = [];
document.getElementById('serch').addEventListener('click',function(){
    if(errorcount == 0){
        document.querySelectorAll('.hints>.hint').forEach(function(car){
            car.remove();
        });
        document.querySelectorAll('#solver>div').forEach(function(car){
            car.style.height = '';
        });
        error();

        base = [];
        document.querySelectorAll('.cell').forEach(function(car){
            base.push([car]);
        });
        let classes = [];
        base.forEach(function(car){
            classes = car[0].getAttribute('class').split(' ');
            classes.shift();
            classes.forEach(function(dar){
                car.push(dar);
            });
        });
        for (i = 1; i <= 9; i++){
            base.forEach(function(car){
                let carclass = car[0].getAttribute('class').split(' ');
                carclass.shift();
                if(car[0].innerHTML !== ''){
                    if(car[0].innerHTML == i){
                        base.forEach(function(dar){
                            for (ii = 1; ii <= 3; ii++){
                                if(dar[0].classList.contains(car[ii])){
                                    let yet = 0;
                                    base[base.indexOf(dar)].forEach(function(ear){
                                        if(ear == i){
                                            yet = 1;
                                        };
                                    });
                                    if(yet == 0){
                                        base[base.indexOf(dar)].push(i);
                                    };
                                };
                            };
                        });
                    };
                };
            });
        };

        level1 = [];
        for (i = 1; i <= 3; i++){
            base.forEach(function(car){
                let judge = [];
                if(car[0].innerHTML == ''){
                    base.forEach(function(dar){
                        if(dar[i] == car[i]){
                            judge.push(dar[0].innerHTML);
                        };
                    });
                };
                if(judge.filter(value => value == '').length == 1){
                    let hint = document.createElement('div');
                    hint.setAttribute('class','hint');
                    let hint1 = document.createElement('div');
                    let hint2 = document.createElement('div');
                    hint1.setAttribute('class','hint1');
                    hint2.setAttribute('class','hint2');
                    hint.appendChild(hint1);
                    hint.appendChild(hint2);
                    document.querySelector('#level1>.hints').appendChild(hint);

                    level1.push(['.' + car[i],judge.indexOf('')]);
                };
            });
        };
        console.log(base)
        console.log(level1)

        level2 = [];
        for (i = 1; i <= 9; i++){
            let selector = 'box' + i;
            let judge = [];
            base.forEach(function(car){
                if(car[3] == selector){
                    judge.push(car);
                };
            });
            for (ii = 1; ii <= 9; ii++){
                let count = 0;
                let blank = '';
                judge.forEach(function(car){
                    if(car[0].innerHTML !== '' || car.filter(value => value == ii).length == 1){
                        count += 1;
                    } else {
                        blank = car;
                    };
                });
                if(count == 8){
                    let yet = 0;
                    level1.forEach(function(dar){
                        if(Array.from(document.querySelectorAll(dar[0]))[dar[1]] == Array.from(document.querySelectorAll('.' + selector))[judge.indexOf(blank)]){
                            yet = 1;
                        };
                    });
                    if(yet == 0){
                        let hint = document.createElement('div');
                        hint.setAttribute('class','hint');
                        let hint1 = document.createElement('div');
                        let hint2 = document.createElement('div');
                        let hint3 = document.createElement('div');
                        hint1.setAttribute('class','hint1');
                        hint2.setAttribute('class','hint2');
                        hint3.setAttribute('class','hint3');
                        hint.appendChild(hint1);
                        hint.appendChild(hint2);
                        hint.appendChild(hint3);
                        document.querySelector('#level2>.hints').appendChild(hint);

                        level2.push([ii,selector,judge.indexOf(blank)]);
                    };
                };
            };
        };
        console.log(level2)

        level3 = [];
        for (i = 1; i <= 9; i++){
            let selector = 'row' + i;
            let judge = [];
            base.forEach(function(car){
                if(car[1] == selector){
                    judge.push(car);
                };
            });
            for (ii = 1; ii <= 9; ii++){
                let count = 0;
                let blank = '';
                judge.forEach(function(car){
                    if(car[0].innerHTML !== '' || car.filter(value => value == ii).length == 1){
                        count += 1;
                    } else {
                        blank = car;
                    };
                });
                if(count == 8){
                    let yet = 0;
                    level1.forEach(function(dar){
                        if(Array.from(document.querySelectorAll(dar[0]))[dar[1]] == Array.from(document.querySelectorAll('.' + selector))[judge.indexOf(blank)]){
                            yet = 1;
                        };
                    });
                    level2.forEach(function(dar){
                        if(Array.from(document.querySelectorAll('.' + dar[1]))[dar[2]] == Array.from(document.querySelectorAll('.' + selector))[judge.indexOf(blank)]){
                            yet = 1;
                        };
                    });
                    if(yet == 0){
                        let hint = document.createElement('div');
                        hint.setAttribute('class','hint');
                        let hint1 = document.createElement('div');
                        let hint2 = document.createElement('div');
                        let hint3 = document.createElement('div');
                        hint1.setAttribute('class','hint1');
                        hint2.setAttribute('class','hint2');
                        hint3.setAttribute('class','hint3');
                        hint.appendChild(hint1);
                        hint.appendChild(hint2);
                        hint.appendChild(hint3);
                        document.querySelector('#level3>.hints').appendChild(hint);

                        level3.push([ii,selector,judge.indexOf(blank)]);
                    };
                };
            };
        };
        for (i = 1; i <= 9; i++){
            let selector = 'column' + i;
            let judge = [];
            base.forEach(function(car){
                if(car[2] == selector){
                    judge.push(car);
                };
            });
            for (ii = 1; ii <= 9; ii++){
                let count = 0;
                let blank = '';
                judge.forEach(function(car){
                    if(car[0].innerHTML !== '' || car.filter(value => value == ii).length == 1){
                        count += 1;
                    } else {
                        blank = car;
                    };
                });
                if(count == 8){
                    let yet = 0;
                    level1.forEach(function(dar){
                        if(Array.from(document.querySelectorAll(dar[0]))[dar[1]] == Array.from(document.querySelectorAll('.' + selector))[judge.indexOf(blank)]){
                            yet = 1;
                        };
                    });
                    level2.forEach(function(dar){
                        if(Array.from(document.querySelectorAll('.' + dar[1]))[dar[2]] == Array.from(document.querySelectorAll('.' + selector))[judge.indexOf(blank)]){
                            yet = 1;
                        };
                    });
                    if(yet == 0){
                        let hint = document.createElement('div');
                        hint.setAttribute('class','hint');
                        let hint1 = document.createElement('div');
                        let hint2 = document.createElement('div');
                        let hint3 = document.createElement('div');
                        hint1.setAttribute('class','hint1');
                        hint2.setAttribute('class','hint2');
                        hint3.setAttribute('class','hint3');
                        hint.appendChild(hint1);
                        hint.appendChild(hint2);
                        hint.appendChild(hint3);
                        document.querySelector('#level3>.hints').appendChild(hint);

                        level3.push([ii,selector,judge.indexOf(blank)]);
                    };
                };
            };
        };
        console.log(level3)

        level4 = [];
        base.forEach(function(car){
            if(car[0].innerHTML == ''){
                let judge = [];
                for (i = 1; i <= 3; i++){
                    base.filter(value => value[0].classList.contains(car[i])).forEach(function(dar){
                        judge.push(dar[0].innerHTML);
                    });
                };
                let count = 0;
                let blank = '';
                for (i = 1; i <= 9; i++){
                    if(judge.filter(value => value == i).length >= 1){
                        count += 1;
                    } else {
                        blank = i;
                    };
                };
                if(count == 8){
                    let yet = 0;
                    level1.forEach(function(dar){
                        if(Array.from(document.querySelectorAll(dar[0]))[dar[1]] == Array.from(document.querySelectorAll('.cell'))[base.indexOf(car)]){
                            yet = 1;
                        };
                    });
                    level2.forEach(function(dar){
                        if(Array.from(document.querySelectorAll('.' + dar[1]))[dar[2]] == Array.from(document.querySelectorAll('.cell'))[base.indexOf(car)]){
                            yet = 1;
                        };
                    });
                    level3.forEach(function(dar){
                        if(Array.from(document.querySelectorAll('.' + dar[1]))[dar[2]] == Array.from(document.querySelectorAll('.cell'))[base.indexOf(car)]){
                            yet = 1;
                        };
                    });
                    if(yet == 0){
                        let hint = document.createElement('div');
                        hint.setAttribute('class','hint');
                        let hint1 = document.createElement('div');
                        let hint2 = document.createElement('div');
                        hint1.setAttribute('class','hint1');
                        hint2.setAttribute('class','hint2');
                        hint.appendChild(hint1);
                        hint.appendChild(hint2);
                        document.querySelector('#level4>.hints').appendChild(hint);

                        level4.push([blank,'cell',base.indexOf(car)]);
                    };
                };
            };
        });
        console.log(level4)

        document.querySelectorAll('#solver>div').forEach(function(car){
            if(car.querySelector('.hints').innerHTML == ""){
                car.style.height = '0px';
            };
        })
    };
});

document.addEventListener('click',function(event){
    if(event.target.classList.contains('hint4')){
        event.target.style.display = 'none';
        helping = 'on';
    } else if (event.target.classList.contains('hint3')){
        //初期化
        let level = event.target.parentElement.parentElement.parentElement.getAttribute('id');
        if(level == 'level2' || level == 'level3'){
            document.querySelectorAll('.cell').forEach(function(car){
                car.style.background = '';
            });
            document.querySelectorAll('.frame').forEach(function(car){
                car.style.display = '';
            });
            document.querySelectorAll('.hint3').forEach(function(car){
                car.style.display = '';
            });
            document.querySelectorAll('.hint2').forEach(function(car){
                car.style.display = '';
            });
            document.querySelectorAll('.hint1').forEach(function(car){
                car.style.display = '';
            });
        };

        event.target.style.display = 'none';
        //level2
        if(event.target.parentElement.parentElement.parentElement.getAttribute('id') == 'level2'){
            let selector = level2[Array.from(document.querySelectorAll('#level2 .hint')).indexOf(event.target.parentElement)];
            Array.from(document.querySelectorAll('.cell')).filter(value => value.innerHTML == selector[0]).forEach(function(car){
                car.style.background = 'rgba(0,0,0,0.5)';
            });
        };
        //level3
        if(event.target.parentElement.parentElement.parentElement.getAttribute('id') == 'level3'){
            let selector = level3[Array.from(document.querySelectorAll('#level3 .hint')).indexOf(event.target.parentElement)];
            Array.from(document.querySelectorAll('.cell')).filter(value => value.innerHTML == selector[0]).forEach(function(car){
                car.style.background = 'rgba(0,0,0,0.5)';
            });
        };
        helping = 'on';
    } else if (event.target.classList.contains('hint2')){
        //初期化
        let level = event.target.parentElement.parentElement.parentElement.getAttribute('id');
        if(level == 'level1' || level == 'level4'){
            document.querySelectorAll('.cell').forEach(function(car){
                car.style.background = '';
            });
            document.querySelectorAll('.frame').forEach(function(car){
                car.style.display = '';
            });
            document.querySelectorAll('.hint3').forEach(function(car){
                car.style.display = '';
            });
            document.querySelectorAll('.hint2').forEach(function(car){
                car.style.display = '';
            });
            document.querySelectorAll('.hint1').forEach(function(car){
                car.style.display = '';
            });
        };

        event.target.style.display = 'none';
        //level1
        if(event.target.parentElement.parentElement.parentElement.getAttribute('id') == 'level1'){
            let selector = level1[Array.from(document.querySelectorAll('#level1 .hint')).indexOf(event.target.parentElement)];
            document.querySelectorAll('.cell' + selector[0]).forEach(function(car){
                car.style.background = 'rgba(0,0,0,0.2)';
            });
        };
        //level2
        if(event.target.parentElement.parentElement.parentElement.getAttribute('id') == 'level2'){
            let selector = level2[Array.from(document.querySelectorAll('#level2 .hint')).indexOf(event.target.parentElement)];
            document.querySelector('.frame.' + selector[1]).style.display = 'block';
        };
        //level3
        if(event.target.parentElement.parentElement.parentElement.getAttribute('id') == 'level3'){
            let selector = level3[Array.from(document.querySelectorAll('#level3 .hint')).indexOf(event.target.parentElement)];
            document.querySelector('.frame.' + selector[1]).style.display = 'block';
        };
        //level4
        if(event.target.parentElement.parentElement.parentElement.getAttribute('id') == 'level4'){
            let selector = level4[Array.from(document.querySelectorAll('#level4 .hint')).indexOf(event.target.parentElement)];
            document.querySelectorAll('.cell.' + base[selector[2]][1]).forEach(function(car){
                car.style.background = 'rgba(0,0,0,0.2)';
            });
            document.querySelectorAll('.cell.' + base[selector[2]][2]).forEach(function(car){
                car.style.background = 'rgba(0,0,0,0.2)';
            });
            document.querySelectorAll('.cell.' + base[selector[2]][3]).forEach(function(car){
                car.style.background = 'rgba(0,0,0,0.2)';
            });
        };
        helping = 'on';
    } else if (event.target.classList.contains('hint1')){
        event.target.style.display = 'none';
        //level1
        if(event.target.parentElement.parentElement.parentElement.getAttribute('id') == 'level1'){
            let selector = level1[Array.from(document.querySelectorAll('#level1 .hint')).indexOf(event.target.parentElement)];
            Array.from(document.querySelectorAll('.cell' + selector[0]))[selector[1]].style.background = 'rgba(0, 0, 0, 0.5)';
        };
        //level2
        if(event.target.parentElement.parentElement.parentElement.getAttribute('id') == 'level2'){
            let selector = level2[Array.from(document.querySelectorAll('#level2 .hint')).indexOf(event.target.parentElement)];
            Array.from(document.querySelectorAll('.cell')).filter(value => value.innerHTML == selector[0]).forEach(function(car){
                let classes = car.getAttribute('class').split(' ');
                document.querySelectorAll('.cell').forEach(function(dar){
                    if(dar.classList.contains(classes[1])){
                        dar.style.background = 'rgba(0,0,0,0.2)';
                    };
                });
                document.querySelectorAll('.cell').forEach(function(dar){
                    if(dar.classList.contains(classes[2])){
                        dar.style.background = 'rgba(0,0,0,0.2)';
                    };
                });
                document.querySelectorAll('.cell').forEach(function(dar){
                    if(dar.classList.contains(classes[3])){
                        dar.style.background = 'rgba(0,0,0,0.2)';
                    };
                });
                car.style.background = 'rgba(0,0,0,0.5)';
            });
        };
        //level3
        if(event.target.parentElement.parentElement.parentElement.getAttribute('id') == 'level3'){
            let selector = level3[Array.from(document.querySelectorAll('#level3 .hint')).indexOf(event.target.parentElement)];
            Array.from(document.querySelectorAll('.cell')).filter(value => value.innerHTML == selector[0]).forEach(function(car){
                let classes = car.getAttribute('class').split(' ');
                document.querySelectorAll('.cell').forEach(function(dar){
                    if(dar.classList.contains(classes[1])){
                        dar.style.background = 'rgba(0,0,0,0.2)';
                    };
                });
                document.querySelectorAll('.cell').forEach(function(dar){
                    if(dar.classList.contains(classes[2])){
                        dar.style.background = 'rgba(0,0,0,0.2)';
                    };
                });
                document.querySelectorAll('.cell').forEach(function(dar){
                    if(dar.classList.contains(classes[3])){
                        dar.style.background = 'rgba(0,0,0,0.2)';
                    };
                });
                car.style.background = 'rgba(0,0,0,0.5)';
            });
        };
        //level4
        if(event.target.parentElement.parentElement.parentElement.getAttribute('id') == 'level4'){
            let selector = level4[Array.from(document.querySelectorAll('#level4 .hint')).indexOf(event.target.parentElement)];
            Array.from(document.querySelectorAll('.cell'))[selector[2]].style.background = 'rgba(0,0,0,0.5)';
        };
        helping = 'on';
    };
});