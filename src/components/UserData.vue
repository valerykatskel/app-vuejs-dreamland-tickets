<script>
  export default {
    props:[
        'email',
        'userName',
        'phone',
        'agree',
        'totalCount'
    ],
  }
</script>

<template>
    <fieldset 
        class="user-data-wrapper"
        :class="this.totalCount === 0 ? 'hidden' : ''"
    >
        <table class="user-data">
            <tr>
            <th><label for="email">Эл. почта<span class="red">*</span></label></th>
            <td>
                <input name="email" id="email" type="email" placeholder="На указанный e-mail мы вышлем электронный билет" required v-model="this.email">
                <p class="descr">На указанный e-mail мы вышлем электронный билет</p>
            </td>
            </tr>
            <tr>
            <th><label for="name">Представьтесь</label></th>
            <td>
                <input name="name" id="name" type="text" placeholder="Мы можем указать ваше имя на билете" v-model="this.userName">
                <p class="descr">Мы можем указать ваше имя на билете</p>
            </td>
            </tr>
            <tr>
            <th><label for="phone">Номер телефона<span class="red">*</span></label></th>
            <td>
                <input name="phone" id="phone" type="tel" required placeholder="+XXX (XX) XXX-XX-XX" pattern="(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*" v-model="this.phone">
                <p class="descr">В формате +XXX (XX) XXX-XX-XX</p>
            </td>
            </tr>
            <tr>
            <th></th>
            <td><p class="descr">Ваши данные могут быть переданы организаторам для сообщения важной информации</p></td>
            </tr>
            <tr>
            <th></th>
            <td>
                <label class="checkbox-agree">
                <input class="checkbox" type="checkbox" name="checkbox-agree" id="agree" required v-model="this.agree">
                <span class="checkbox-custom"></span>
                <span class="label">Согласен</span>
                </label>
            </td>
            </tr>
        </table>
        <p><span class="red">*</span> — обязательно для заполнения</p>
    </fieldset>
</template>
