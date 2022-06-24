/** @format */

let employeeList = [];

function Employee(
    tknv,
    name,
    email,
    password,
    datepicker,
    luongCB,
    gioLam,
    chucvu
) {
    this.tknv = tknv;
    this.name = name;
    this.email = email;
    this.password = password;
    this.datepicker = datepicker;
    this.luongCB = luongCB;
    this.chucvu = chucvu;
    this.gioLam = gioLam;
    this.tongLuong = function () {
        // let tongLuong;
        switch (this.position) {
            case 'Sếp':
                tongLuong = luongCB * 3;
                break;
            case 'Trưởng Phòng':
                tongLuong = luongCB * 2;
                break;
            default:
                tongLuong = luongCB;
                break;
        }
        return tongLuong;
    };
    this.xepLoai = function () {
        if (this.gioLam >= 192) {
            return 'Xuất sắc';
        }
        if (this.gioLam >= 176) {
            return 'Giỏi';
        }
        if (this.gioLam >= 160) {
            return 'Khá';
        }
        return 'Trung bình';
    };
}

function themNhanVien() {
    const tknv = document.querySelector('#tknv').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const datepicker = document.querySelector('#datepicker').value;
    const name = document.querySelector('#name').value;
    const luongCB = +document.querySelector('#luongCB').value;
    const gioLam = +document.querySelector('#gioLam').value;
    const chucvu = document.querySelector('#chucvu').value;

    const isValid = validation();

    const index = employeeList.findIndex(nv => nv.tknv === tknv)

    if(index !== -1) {
        return alert("Tài khoản nhân viên trùng lặp!")
    }

    if (!isValid) return;

    const employee = new Employee(
        tknv,
        name,
        email,
        password,
        datepicker,
        luongCB,
        gioLam,
        chucvu
    );
    employeeList.push(employee);
    renderNhanVien();
    saveData();
}

function renderNhanVien(data) {
    if(!data) {
        data = employeeList
    }
    const employeeItem = data
        .map((employee, index) => {
            return `<tr>
            <th>${employee.tknv}</th>
            <th>${employee.name}</th>
            <th>${employee.email}</th>
            <th>${employee.datepicker}</th>
            <th>${employee.chucvu}</th>
            <th>${employee.tongLuong()}</th>
            <th>${employee.xepLoai()}</th>
            <th class="d-flex"><button class='btn btn-danger' onclick="xoaNhanVien(${
                employee.tknv
            })">Xoá</button>
            <button class='btn btn-primary ml-2' data-toggle="modal"
            data-target="#myModal" onclick='suaNhanVien(${index})'>Sửa</button></th>
            </tr>`;
        })
        .join('');

    document.querySelector('#tableDanhSach').innerHTML = employeeItem;
}

function validation() {
    let isValid = document.querySelector('#formQLNV').checkValidity();
    const testName = /^\D\D+$/g;

    if (!isValid) {
        const tknv = document.querySelector('#tknv');
        const tbTKNVEle = document.querySelector('#tbTKNV');
        if (tknv.validity.valueMissing || tknv.validity.tooShort) {
            tbTKNVEle.innerHTML = 'Tài khoản phải có từ 4 - 6 chữ số';
            tbTKNVEle.style.display = 'block';
        } else {
            tbTKNVEle.innerText = '';
            tbTKNVEle.style.display = 'none';
        }

        const name = document.querySelector('#name');
        const tbTenEle = document.querySelector('#tbTen');
        if (!testName.test(name.value)) {
            tbTenEle.innerText = 'Tên phải là chữ cái';
            tbTenEle.style.display = 'block';
        } else {
            tbTenEle.innerText = '';
            tbTenEle.style.display = 'none';
        }

        const email = document.querySelector('#email');
        const tbEmail = document.querySelector('#tbEmail');
        if (email.validity.typeMismatch || email.validity.valueMissing) {
            tbEmail.innerText = 'Email không đúng định dạng';
            tbEmail.style.display = 'block';
        } else {
            tbEmail.innerText = '';
            tbEmail.style.display = 'none';
        }

        const password = document.querySelector('#password');
        const tbMatKhau = document.querySelector('#tbMatKhau');
        if (password.validity.tooShort || password.validity.valueMissing) {
            tbMatKhau.innerText = 'Mật khẩu phải có từ 6 - 10 ký tự';
            tbMatKhau.style.display = 'block';
        } else if (!/[0-9]/.test(password.value)) {
            tbMatKhau.innerText = 'Mật khẩu phải có ít nhất 1 chữ số';
            tbMatKhau.style.display = 'block';
        } else if (!/[A-Z]/.test(password.value)) {
            tbMatKhau.innerText = 'Mật khẩu phải có ít nhất 1 chữ in hoa';
            tbMatKhau.style.display = 'block';
        } else if (!/[^A-Za-z0-9]/.test(password.value)) {
            tbMatKhau.innerText = 'Mật khẩu phải có ít nhất ký tự đặc biệt';
            tbMatKhau.style.display = 'block';
        } else {
            tbMatKhau.innerText = '';
            tbMatKhau.style.display = 'none';
        }

        const datepicker = document.querySelector('#datepicker');
        const tbNgay = document.querySelector('#tbNgay');

        if (
            !/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/g.test(
                datepicker.value
            )
        ) {
            tbNgay.innerText = 'Ngày sai định dạng';
            tbNgay.style.display = 'block';
        } else if (datepicker.validity.valueMissing) {
            tbNgay.innerText = 'Ngày không được để trống';
            tbNgay.style.display = 'block';
        } else {
            tbNgay.innerText = '';
            tbNgay.style.display = 'none';
        }

        const luongCB = +document.querySelector('#luongCB').value;
        const tbLuongCB = document.querySelector('#tbLuongCB');

        if (luongCB < 1000000 || luongCB > 20000000 || !luongCB) {
            tbLuongCB.innerText = 'Lương phải từ 1 000 000 - 20 000 000';
            tbLuongCB.style.display = 'block';
        } else {
            tbLuongCB.innerText = '';
            tbLuongCB.style.display = 'none';
        }

        const chucvu = document.querySelector('#chucvu').value;
        const tbChucVu = document.querySelector('#tbChucVu');

        switch (chucvu) {
            case 'Sếp':
            case 'Trưởng phòng':
            case 'Nhân viên':
                tbChucVu.innerText = '';
                tbChucVu.style.display = 'none';
                break;

            default:
                tbChucVu.innerText = 'Bạn chưa chọn chức vụ';
                tbChucVu.style.display = 'block';
                break;
        }

        const gioLam = +document.querySelector('#gioLam').value;
        const tbGiolam = document.querySelector('#tbGiolam');

        if (gioLam < 80 || gioLam > 200 || !gioLam) {
            tbGiolam.innerText = 'Giờ làm phải từ 80 - 200 giờ';
            tbGiolam.style.display = 'block';
        } else {
            tbGiolam.innerText = '';
            tbGiolam.style.display = 'none';
        }
    }

    return isValid;
}

function xoaNhanVien(tknv) {
    employeeList = employeeList.filter((nv) => +nv.tknv !== tknv);
    renderNhanVien();
    saveData();
}

function suaNhanVien(index) {
    let nhanVien = employeeList[index];

    document.querySelector('#tknv').value = nhanVien.tknv;
    document.querySelector('#email').value = nhanVien.email;
    document.querySelector('#password').value = nhanVien.password;
    document.querySelector('#datepicker').value = nhanVien.datepicker;
    document.querySelector('#name').value = nhanVien.name;
    document.querySelector('#luongCB').value = nhanVien.luongCB;
    document.querySelector('#gioLam').value = nhanVien.gioLam;
    document.querySelector('#chucvu').value = nhanVien.chucvu;
}

function capNhatNhanVien() {
    const tknv = document.querySelector('#tknv').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const datepicker = document.querySelector('#datepicker').value;
    const name = document.querySelector('#name').value;
    const luongCB = +document.querySelector('#luongCB').value;
    const gioLam = +document.querySelector('#gioLam').value;
    const chucvu = document.querySelector('#chucvu').value;

    const isValid = validation();

    if (!isValid) return;

    let nhanVienDaUpdate = new Employee(
        tknv,
        name,
        email,
        password,
        datepicker,
        luongCB,
        gioLam,
        chucvu
    );

    const foundIndex = employeeList.findIndex((nv) => nv.tknv === tknv);

    employeeList[foundIndex] = nhanVienDaUpdate;

    renderNhanVien();
    saveData();
}

function timNhanVien() {
    var results = [];
    var keyword = document
        .querySelector('#searchName')
        .value.toLowerCase()
        .trim();

    for (var i = 0; i < employeeList.length; i++) {
        var currentEmployee = employeeList[i];
        if (currentEmployee.xepLoai().toLowerCase() === keyword) {
            results.push(currentEmployee);
        }
    }

    console.log('work')

    renderNhanVien(results);
}

function saveData() {
    localStorage.setItem('list', JSON.stringify(employeeList));
}

function getData() {
    var employeeListStr = localStorage.getItem('list');

    if (!employeeListStr) return;

    employeeList = mapData(JSON.parse(employeeListStr));

    renderNhanVien();
}

function mapData(dataFromLocal) {
    var mappedData = [];
    for (var i = 0; i < dataFromLocal.length; i++) {
        var item = dataFromLocal[i];

        var newEmployee = new Employee(
            item.tknv,
            item.name,
            item.email,
            item.password,
            item.datepicker,
            item.luongCB,
            item.gioLam,
            item.chucvu
        );

        mappedData.push(newEmployee);
    }

    return mappedData;
}

getData();

document.querySelector('#btnThemNV').onclick = themNhanVien;
document.querySelector('#btnCapNhat').onclick = capNhatNhanVien;
document.querySelector("#btnTimNV").onclick = timNhanVien;
