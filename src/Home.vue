<template>
  <div class="container-fluid">
    <div class="row text-center mt-3">
      <!-- Kullanıcı bilgisi başlangıcı -->
      <div class="col-xs-12 col-sm-12 col-md-3 mt-2 animated flipInX">
        <div class="card shadow-lg">
          <div class="card-body">
            <h5 class="card-title">
              <ins>Kullanıcı Bilgisi:</ins>
            </h5>
            <h3 class="card-text badge badge-primary">{{activeUserEmail}}</h3>
            <br />
            <button
              data-toggle="modal"
              data-target="#myModal"
              class="btn btn-secondary btn-sm"
            >Parola Değiştir</button>
          </div>
        </div>
      </div>
      <!-- Kullanıcı bilgisi başlangıcı -->

      <div class="col-xs-12 col-sm-12 col-md-6 mt-2 animated flipInX">
        <!-- 1. apiden çekilen datalar başlangıcı -->
        <div class="card border-dark">
          <div class="card-body text-left">
            <h5
              class="card-title text-center bg-dark p-3 border rounded text-white shadow"
            >APİ: {{this.$store.state.api1}}</h5>

            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">{{getData1[0] ? Object.keys(getData1[0])[0] : "" }}</th>
                  <th scope="col">{{getData1[0] ? Object.keys(getData1[0])[1] : ""}}</th>
                </tr>
              </thead>
              <tbody>
                <tr :key="index" v-for="(oneData, index) in getData1">
                  <th scope="row">{{index}}</th>
                  <td>{{oneData.symbol}}</td>
                  <td>{{oneData.amount}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- 1. apiden çekilen datalar sonu -->

        <hr class="bg-danger" />

        <!-- 2. apiden çekilen datalar başlangıcı -->
        <div class="card mt-3 mb-3 border border-warning">
          <div class="card-body text-left">
            <h5
              class="card-title text-center bg-warning p-3 border rounded text-white shadow"
            >APİ: {{this.$store.state.api2}}</h5>

            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">{{getData2[0] ? Object.keys(getData2[0])[0] : ""}}</th>
                  <th scope="col">{{getData2[0] ? Object.keys(getData2[0])[1] : ""}}</th>
                </tr>
              </thead>
              <tbody>
                <tr :key="index" v-for="(oneData, index) in getData2">
                  <th scope="row">{{index}}</th>
                  <td>{{oneData.kod}}</td>
                  <td>{{oneData.oran}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- 2. apiden çekilen datalar sonu -->
      </div>

      <!-- Oturum işlemleri başlangıcı -->
      <div class="col-xs-12 col-sm-12 col-md-3 mt-2 mb-2 animated flipInX">
        <div class="card shadow-lg">
          <div class="card-body">
            <h5 class="card-title">Oturum İşlemleri:</h5>
            <button @click.prevent="deleteUser" class="btn btn-secondary btn-sm mb-2">Hesabı Sil</button>
            <br />
            <a @click.prevent="logOut" class="btn btn-outline-danger">Oturumu Kapat</a>
          </div>
        </div>
      </div>
      <!-- Oturum işlemleri sonu -->
    </div>

    <!-- Parola değiştirme modalı başlangıcı -->
    <div class="modals">
      <!-- The Modal -->
      <div class="modal" id="myModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header alert alert-success text-dark">
              <h4 class="modal-title">Değiştirilebilir Kullanıcı Bilgileri</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <!-- Modal body -->
            <div class="modal-body text-center">
              <label class="text-center">
                <strong>
                  <ins>Yeni Parola</ins>
                </strong>
              </label>
              <input
                v-model="user.newPassword"
                type="email"
                class="form-control text-primary"
                placeholder="Yeni parola giriniz."
              />
              <button @click="passwordRefnesh" class="btn btn-success mt-3">Onayla</button>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Kapat</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Parola değiştirme modalı sonu -->
  </div>
</template>

<script>
export default {
  methods: {
    logOut() {
      this.$store.dispatch("logout");
      // Store.js'deki oturum kapatma fonksiyonunu tetikler.
    },
    passwordRefnesh() {
      this.$store
        .dispatch("passwordRefnesh", { ...this.user })
        .then((response) => {
          alert("Yeni şifreniz başarıyla oluşturuldu.");
        });
      // Store.js'deki parola yenileme fonksiyonunu tetikler. Başarı sağlanırsa kullanıcıya bildirir.
    },
    deleteUser() {
      if (confirm("Onaylarsanız hesabınız silinecektir.")) {
        this.$store.dispatch("deleteUser");
      }
      // Store.js'deki kullanıcı hesabını silme fonksiyonunu tetikler.
    },
  },
  computed: {
    activeUserEmail() {
      return this.$store.state.activeUser;
      // Oturum açan kullanıcının email adresini getirir.
    },
    getData1() {
      var data = this.$store.state.getData1;
      return data;
      // Api 1 verilerini store'den getiri.
    },
    getData2() {
      var data2 = this.$store.state.getData2;
      return data2;
      // Api 1 verilerini store'den getiri.
    },
  },
  data() {
    return {
      user: {
        newPassword: "",
      },
    };
  },
};
</script>

<style scoped>
</style>
