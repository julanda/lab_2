const gunList = document.querySelector('#gun-list');
var guns = [];
const pagi = document.querySelector('.pagi');
const gunsJson =  fetch(`./page/page-1.json`).then((resp) => resp.json()).catch(function(err) {  
    console.log('Error :-S', err);  
  }); 
console.log(gunsJson);
async function CRUD() {
   if (!!(window.localStorage.getItem('guns'))) {
      guns = JSON.parse(window.localStorage.getItem('guns'));
    } else {
      await gunsJson.then(data => data.map(item => guns.push(item)));
      localStorage.setItem("guns",JSON.stringify(guns));
    } 
    console.log(guns);
    function showGuns(start, end, arr) {
        gunList.innerHTML = '';
        for(let i = start; i < end && i < arr.length; i++) {
            const tr = document.createElement('tr');
            tr.classList.add('gun-item');
            tr.innerHTML = `<tr><th class="id" style="width:2%; visibility: hidden;">${i}</th><th>${arr[i].Name}</th><th>${arr[i].Model}</th><th>${arr[i].Weight}</th><th>${arr[i].Rate}</th><th>${arr[i].Price}</th><th class="upd" data-toggle="modal" data-target="#myModalUpdate" style="width:2%">&#9997</th><th class="delete" style="width:2%">&#128465</th></tr>`;
            gunList.appendChild(tr);
     }    
    };
    showGuns(0, 10, Guns);
    function addPagination(arr) {
    const pageCount = Math.ceil(arr.length / 10);
     for(let i = 0; i < pageCount; i++) {
        const li = document.createElement('li');
        li.innerHTML = i+1;
        li.setAttribute('data-page', i+1);
        li.setAttribute('id','pagination');
        if(i == 0) {li.classList.add('active')}
        pagi.appendChild(li);
     }    
    }
    addPagination(Guns);
    function removeElementsByClass(){
     console.log("Pagination");
     $('#pagina li').remove();
}
//обработка пагинации 
document.querySelector('.pagi').addEventListener('click', function(e){
 const page = e.target.getAttribute('data-page');
    document.querySelector('.pagi li.active').classList.remove('active');
    e.target.classList.add('active');         
    let start = (page - 1) * 10,
        end =  page*10;
    showGuns(start, end, Guns);
     
});
    
    
    gunList.addEventListener('click', function(e){
        const target = e.target;
        const id = (target.classList.contains('delete') || target.classList.contains('upd')) &&  target.parentElement.firstElementChild.textContent;
        target.classList.contains('delete') && confirm("Do you want to delete?") && guns.splice(id, 1);
        localStorage.setItem("guns",JSON.stringify(guns));
        if(target.classList.contains('upd')) {
          document.querySelector('.jsUpdateModal').classList.add('active');
          const title = document.querySelector('#up-name').value = guns[id].name,
                book = document.querySelector('#up-model').value = guns[id].model,
                hiddenId = document.querySelector('#id-hidden').value = id,
                name = document.querySelector('#up-weight').value = guns[id].weight;
                theme = document.querySelector('#up-rate').value = guns[id].rate;
                price = document.querySelector('#up-price').value = guns[id].price;
        } 
        //delete guns[id]; 
        removeElementsByClass();
        showguns(0, 10, guns);
        addPagination(guns);
    });
    document.querySelector('#gun-form').addEventListener('submit', function(e){
        e.preventDefault();
        let name = document.querySelector('#name').value, 
            model = document.querySelector('#model').value, 
            weight = document.querySelector('#weight').value;
            rate = document.querySelector('#rate').value;
            price = document.querySelector('#price').value;
        const obj = {'name': name, 'model': model,  'weight': weight, 'rate': rate, 'price': price};
        books.unshift(obj);
        localStorage.setItem("guns",JSON.stringify(guns));
        showBooks(0, 10, guns);
        this.reset();

        $("#myModal .close").click()
        document.querySelector('.success').classList.remove('hide');
        setTimeout(function() {
            document.querySelector('.success').classList.add('hide')}
                   , 2200);
    });

     document.querySelector('#search').addEventListener('keyup', function(){
      const arr =  guns.filter(item => { return (item.title.toLowerCase().indexOf(this.value.toLowerCase()) > -1) || (item.gun.toLowerCase().indexOf(this.value.toLowerCase()) > -1) || (item.name.toLowerCase().indexOf(this.value.toLowerCase()) > -1) || (item.theme.toLowerCase().indexOf(this.value.toLowerCase()) > -1) || (item.price.toLowerCase().indexOf(this.value.toLowerCase()) > -1)}); 
    if(arr.length > 0) {
    
      showguns(0, 10, arr);
      removeElementsByClass();
      addPagination(arr);
                } else {
          document.querySelector("#gun-list").innerHTML = "Nothing to find";
          removeElementsByClass();
        }
    });


    var grid = document.getElementById('table');
    grid.onclick = function(e) {
      if (e.target.tagName != 'TH') return;

      sortGrid(e.target.cellIndex, e.target.getAttribute('data-type'));
    };
  function sortGrid(colNum, type) {
      var tbody = grid.getElementsByTagName('tbody')[0];
      var rowsArray = [].slice.call(tbody.rows);
      var compare;
      switch (type) {
        case 'number':
          compare = function(rowA, rowB) {
            return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
          };
          break;
        case 'string':
          compare = function(rowA, rowB) {
            return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ? 1 : -1;
          };
          break;
      }

      rowsArray.sort(compare);
      grid.removeChild(tbody);
      for (var i = 0; i < rowsArray.length; i++) {
        tbody.appendChild(rowsArray[i]);
      }

      grid.appendChild(tbody);

    }
    document.querySelector('#update-form').addEventListener('submit', function(e){
        e.preventDefault();
        if(confirm('Update?')) {
        const name = document.querySelector('#up-name').value,
                model = document.querySelector('#up-model').value,
                hiddenId = document.querySelector('#id-hidden').value,
                weight = document.querySelector('#up-weight').value;
                rate = document.querySelector('#up-rate').value;
                price = document.querySelector('#up-price').value;
        guns[hiddenId] = {'name': name, 'model': model, 'weight': weight, 'rate': rate, 'price': price};
        showguns(0, 10, guns);
        document.querySelector('.jsUpdateModal').classList.remove('active');
        localStorage.setItem("guns",JSON.stringify(guns));


        $("#myModalUpdate .close").click()
        }
        return false;
    })
    }
    
CRUD();