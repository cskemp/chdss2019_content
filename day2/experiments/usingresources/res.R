library(jaysire)

# set directory (deletes any existing old experiment builds in it)
my_directory <- file.path("res_exp")
# create the empty folder if necessary
if(dir.exists(my_directory)) {
  unlink(my_directory, recursive = TRUE)
}

# ----------- resource information -----------
# need to do this

# ----------- trial template -----------
trial_template <- trial_image_button_response(
  stimulus = insert_variable(name = "my_stimulus"),
  stimulus_height = 200,
  stimulus_width = 200,
  choices = c("ugly", "okay", "pretty"),
  post_trial_gap = 200
)

# ----------- build the timeline -----------
# need to do this

# ----------- build the experiment -----------
build_experiment(
  timeline = trials,
  path = my_directory, 
  on_finish = fn_save_locally()
)
