var WardController = function () {
    this.initialize = function () {
        loadData();
        registerEvents();
        registerControl()
    }

    class WardViewModel {
        constructor() {
            this.Id = +($('#hidIdM').val());;
            this.Name = $('#txtName').val();
            this.ProvinceId = +($('#ProvinceId').val());
            this.DistrictId = +($('#DistrictId').val());
            this.Status = $('#ckStatus').prop('checked') === true ? 1 : 0;
        }
        Validate() {
            var isValid = true;
            if (!this.Name) {
                be.notify('Tên không được bỏ trống!!!', "", 'error');
                isValid = false;
            }

            if (!this.ProvinceId) {
                be.notify('Tỉnh/Thành Phố không được bỏ trống!!!', "", 'error');
                isValid = false;
            }

            if (!this.DistrictId) {
                be.notify('Quận/Huyện không được bỏ trống!!!', "", 'error');
                isValid = false;
            }

            debugger;
            return isValid;
        }
    }
    function registerControl() {
        $('#ProvinceId,#ProvinceSearch').select2({
            placeholder: "Chọn tỉnh/thành phố",
            allowClear: true,
        });
        $('#DistrictId,#DistrictSearch').select2({
            placeholder: "Chọn quận/huyện",
            allowClear: true,
        });
    }
    function registerEvents() {

        $('#txt-search-keyword').keypress(function (e) {
            if (e.which === 13) {
                e.preventDefault();
                loadData(true);
            }
        });

        $("#ProvinceSearch").on('change', function (e) {
            e.preventDefault();
            getDistricts("#boxDllDistrictSearch", false, +($('#ProvinceSearch').val()), () => loadData(true));
        });
        $('body').on('change', "#DistrictSearch", function (e) {
            debugger;
            e.preventDefault();
            loadData(true);
        });

        $("#ProvinceId").on('change', function (e) {
            e.preventDefault();
            getDistricts("#boxDllDistrictId", true, +($('#ProvinceId').val()))
        });

        $("#ddl-show-page").on('change', function () {
            be.configs.pageSize = $(this).val();
            be.configs.pageIndex = 1;
            loadData(true);
        });

        $("#btn-create").on('click', function () {
            resetFormMaintainance();
            $('#modal-add-edit').modal('show');
        });

        $('body').on('click', '.btn-edit', function (e) { loadDetails(e, this) });

        $('#btnSave').on('click', function (e) { saveWard(e) });

        $('body').on('click', '.btn-delete', function (e) { deleteWard(e, this) });
    };
    function getDistricts(element, type, provinceId, cb) {
        debugger;
        $.ajax({
            type: "GET",
            url: "/Admin/Ward/GetDistricts",
            data: { provinceId, type },
            dataType: "html",
            beforeSend: function () {
                be.startLoading();
            },
            success: function (response) {
                debugger;
                $(element).html(response);
                debugger;

                if (cb) cb();
            },
            error: function (message) {
                be.notify(`jqXHR.responseText: ${message.responseText}`, `Status code: ${message.status}`, 'error');
                be.stopLoading();
            }
        });
    }
    function saveWard(e) {
        e.preventDefault();

        var wardVm = new WardViewModel();
        if (wardVm.Validate()) {
            $.ajax({
                type: "POST",
                url: "/Admin/Ward/SaveEntity",
                data: { wardVm },
                dataType: "json",
                beforeSend: function () {
                    be.startLoading();
                },
                success: function () {

                    be.notify('Cập nhật xã/phường thành công', "", 'success');

                    $('#modal-add-edit').modal('hide');

                    resetFormMaintainance();

                    be.stopLoading();

                    loadData(true);
                },
                error: function (message) {
                    be.notify(`jqXHR.responseText: ${message.responseText}`, `Status code: ${message.status}`, 'error');
                    be.stopLoading();
                },
            });
        }
    };
    function deleteWard(e, element) {
        e.preventDefault();
        be.confirm('Are you sure to delete?', function () {
            $.ajax({
                type: "POST",
                url: "/Admin/Ward/Delete",
                data: { id: $(element).data('id') },
                dataType: "json",
                beforeSend: function () {
                    be.startLoading();
                },
                success: function () {
                    be.notify('Xóa xã/phường thành công', "", 'success');
                    be.stopLoading();
                    loadData(true);
                },
                error: function (message) {
                    be.notify(`jqXHR.responseText: ${message.responseText}`, `Status code: ${message.status}`, 'error');
                    be.stopLoading();
                }
            });
        });
    };
    function resetFormMaintainance() {
        $('#hidIdM').val(0);
        $('#txtName').val('');
        $('#ckStatus').prop('checked', true);
        $('#ProvinceId').val(null).trigger('change');
    };
    function loadData(isPageChanged) {

        $.ajax({
            type: "GET",
            url: "/admin/Ward/GetAllPaging",
            data: {
                provinceId: +($("#ProvinceSearch").val()),
                districtId: +($("#DistrictSearch").val()),
                keyword: $('#txt-search-keyword').val(),
                page: be.configs.pageIndex,
                pageSize: be.configs.pageSize
            },
            dataType: "json",
            beforeSend: function () {
                be.startLoading();
            },
            success: function (response) {

                var template = $('#table-template').html();
                var render = "";

                $.each(response.Results, function (i, item) {
                    render += Mustache.render(template, {
                        Name: item.Name,
                        ProvinceName: item.Province.Name,
                        DistrictName: item.District.Name,
                        Id: item.Id,
                        Status: be.getStatus(item.Status)
                    });
                });

                $("#lbl-total-records").text(response.RowCount);

                $('#tbl-content').html(render);

                be.wrapPaging(response.RowCount, function () {
                    loadData();
                }, isPageChanged);

                be.stopLoading();
            },
            error: function (message) {
                be.notify(`jqXHR.responseText: ${message.responseText}`, `Status code: ${message.status}`, 'error');
            }
        });
    };
    function loadDetails(e, element) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "/Admin/Ward/GetById",
            data: { id: $(element).data('id') },
            dataType: "json",
            beforeSend: function () {
                be.startLoading();
            },
            success: function (response) {

                $('#hidIdM').val(response.Id);
                $('#txtName').val(response.Name);
                $('#ProvinceId').val(response.ProvinceId).trigger('change');

                getDistricts("#boxDllDistrictId", true, response.ProvinceId, () => $('#DistrictId').val(response.DistrictId).trigger('change'));

                $('#ckStatus').prop('checked', response.Status === 1);

                $('#modal-add-edit').modal('show');
                be.stopLoading();

            },
            error: function (message) {
                be.notify(`jqXHR.responseText: ${message.responseText}`, `Status code: ${message.status}`, 'error');
                be.stopLoading();
            }
        });
    };
}