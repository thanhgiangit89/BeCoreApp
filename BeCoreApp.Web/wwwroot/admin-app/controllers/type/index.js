var TypeController = function () {
    this.initialize = function () {
        loadData();
        registerEvents();
    }

    class TypeViewModel {
        constructor() {
            this.Id = +($('#hidIdM').val());;
            this.Name = $('#txtName').val();
            this.Status = $('#ckStatus').prop('checked') === true ? 1 : 0;
        }

        Validate() {
            var isValid = true;
            if (!this.Name) {
                be.notify('Tên không được bỏ trống!!!', "", 'error');
                isValid = false;
            }
            return isValid;
        }
    }

    function registerEvents() {

        $('#txt-search-keyword').keypress(function (e) {
            if (e.which === 13) {
                e.preventDefault();
                loadData(true);
            }
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

        $('#btnSave').on('click', function (e) { saveType(e) });

        $('body').on('click', '.btn-delete', function (e) { deleteType(e, this) });
    };


    function saveType(e) {
        e.preventDefault();

        var typeVm = new TypeViewModel();
        if (typeVm.Validate()) {
            $.ajax({
                type: "POST",
                url: "/Admin/Type/SaveEntity",
                data: { typeVm },
                dataType: "json",
                beforeSend: function () {
                    be.startLoading();
                },
                success: function () {

                    be.notify('Cập Nhật hình thức thành công',"", 'success');

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

    function deleteType(e, element) {
        e.preventDefault();
        be.confirm('Are you sure to delete?', function () {
            $.ajax({
                type: "POST",
                url: "/Admin/Type/Delete",
                data: { id: $(element).data('id') },
                dataType: "json",
                beforeSend: function () {
                    be.startLoading();
                },
                success: function () {
                    be.notify('Xóa hình thức thành công',"", 'success');
                    be.stopLoading();
                    loadData(true);
                },
                error: function () {
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
    };

    function loadData(isPageChanged) {
        debugger;
        $.ajax({
            type: "GET",
            url: "/admin/Type/GetAllPaging",
            data: {
                keyword: $('#txt-search-keyword').val(),
                page: be.configs.pageIndex,
                pageSize: be.configs.pageSize
            },
            dataType: "json",
            beforeSend: function () {
                be.startLoading();
            },
            success: function (response) {
                debugger;
                var template = $('#table-template').html();
                var render = "";

                $.each(response.Results, function (i, item) {
                    render += Mustache.render(template, {
                        Name: item.Name,
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
                debugger;
                be.notify(`jqXHR.responseText: ${message.responseText}`, `Status code: ${message.status}`, 'error');
            }
        });
    };

    function loadDetails(e, element) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "/Admin/Type/GetById",
            data: { id: $(element).data('id') },
            dataType: "json",
            beforeSend: function () {
                be.startLoading();
            },
            success: function (response) {
                var data = response;
                $('#hidIdM').val(data.Id);
                $('#txtName').val(data.Name);

                $('#ckStatus').prop('checked', data.Status === 1);

                $('#modal-add-edit').modal('show');
                be.stopLoading();

            },
            error: function () {
                be.notify(`jqXHR.responseText: ${message.responseText}`, `Status code: ${message.status}`, 'error');
                be.stopLoading();
            }
        });
    };

}