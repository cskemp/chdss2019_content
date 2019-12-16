library(jaysire)

# set directory (deletes any existing old experiment builds in it)
my_directory <- file.path("adv_exp")
# create the empty folder if necessary
if(dir.exists(my_directory)) {
  unlink(my_directory, recursive = TRUE)
}

# ----------- insert your stimuli here -----------


# ----------- instructions -----------
instructions <- trial_instructions(
  pages = c(
    "Welcome! Use the arrow buttons to browse these instructions",
    "Your task is to decide if an equation like '2 + 2 = 4' is true or false",
    "You will respond by clicking a button",
    "Press the 'Next' button to begin!"
  ),
  show_clickable_nav = TRUE,
  post_trial_gap = 200
)

# ----------- insert your trial template here -----------


# ----------- insert your timeline here -----------


# ----------- final trial -----------
finish <- trial_html_keyboard_response(
  stimulus = "All done! Press any key to finish",
  choices = respond_any_key()
)

# ----------- build the experiment -----------
build_experiment(
  # put your modified timeline here
  path = my_directory,
  on_finish = fn_save_locally()
)
