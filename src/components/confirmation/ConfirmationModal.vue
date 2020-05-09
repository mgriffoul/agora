<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="400"
    >
      <v-card>
        <v-card-title class="headline">Thank you for using Agora</v-card-title>

        <v-card-text>
          Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
        </v-card-text>

        <v-card-actions>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Disagree
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Agree
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
  data: () => {
    return {
      dialog: this.props.shouldDisplayDialog
    }
  }
}
</script>
