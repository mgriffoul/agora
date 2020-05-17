<template>
  <div>
    <v-dialog
      v-model="displayDialog"
      max-width="400"
      @click:outside="onClickButton()"
    >
      <v-card >
        <v-card-title class="headline">Thank you for using Agora.</v-card-title>

        <v-card-text>
          You can now sign in !
        </v-card-text>

        <v-card-actions>
          <v-btn @click="onClickButton()" color="green darken-1" class="mx-auto" text>
            Lets GO
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ConfirmationModal',
  props: {
    shouldDisplayDialog: Boolean
  },
  computed: {
    displayDialog: function () {
      return this.shouldDisplayDialog
    }
  },
  methods: {
    onClickButton () {
      this.$emit('confirm', 'validate')
    }
  }
}
</script>
