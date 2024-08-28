import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import "."
import 'bootstrap/dist/js/bootstrap.bundle'

// Import jQuery
import $ from 'jquery'

// Make jQuery globally available
window.jQuery = $
window.$ = $

Rails.start()
Turbolinks.start()
ActiveStorage.start()

