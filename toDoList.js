
//DOM初始
const btn_add = document.querySelector('.btn_add');
const txt = document.querySelector('.txt');
const list = document.querySelector('.list');


let data = [];
//渲染畫面
function renderData(data) {
    let str = '';
    data.forEach(function (item, index) {
        str += `<li data-id= ${item.id}>
        <label class="checkbox" for="">
          <input type="checkbox" class="ifDone" data-num=${index} ${item.checked} />
          <span>${item.content}</span>
        </label>
        <a href="#" class="delete"></a>
      </li>`;
    });
    list.innerHTML = str;
}


//新增記事
btn_add.addEventListener('click', add)

function add(e) {
    if (txt.value == "") {
        alert('請輸入文字');
        return;
    }
    let obj = {};
    obj.content = txt.value;
    obj.checked = '';
    obj.id = new Date().getTime();
    data.unshift(obj);
    txt.value = "";
    updateList();
};

//鍵盤 Enter 新增
txt.addEventListener('keypress', function (e) {
    if (e.key == 'Enter') {
        add();
    }
})


// tab的css切換
const tab = document.querySelector('.tab');
let toggleStatus = 'all';
tab.addEventListener('click', function (e) {
    toggleStatus = e.target.dataset.tab;

    let tabs = document.querySelectorAll('.tab li');
    tabs.forEach(function (item) {
        item.classList.remove('active');
    })
    e.target.classList.add('active');
    updateList()
});


//刪除記事
list.addEventListener('click', deleteAndChecked);

function deleteAndChecked(e) {
    let id = e.target.closest('li').dataset.id;
    if (e.target.getAttribute('class') == 'delete') {
        e.preventDefault();
        data = data.filter((item) => item.id != id);
        // let num = e.target.getAttribute('data-num');
        // data.splice(num, 1);
        // renderData();
    } else {
        data.forEach(function (item, index) {
            if (item.id == id) {
                if (data[index].checked == 'checked') {
                    data[index].checked = '';
                } else {
                    data[index].checked = 'checked';
                }
            }
        });
    }
    updateList();
};

//條件顯示陣列
const howMany = document.getElementById('howMany');

function updateList() {
    let showData = [];
    if (toggleStatus == 'all') {
        showData = data;
    } else if (toggleStatus == 'notYet') {
        showData = data.filter((item) => item.checked == '');
    } else {
        showData = data.filter((item) => item.checked == 'checked')
    };
    let howManylength = data.filter((item) => item.checked == '');
    howMany.textContent = howManylength.length;
    renderData(showData);
   
};

updateList();

//清除已完成項目

const clear = document.getElementById('clear');

clear.addEventListener('click', function (e) {
    data = data.filter((item) => item.checked != 'checked')
    updateList();
})
